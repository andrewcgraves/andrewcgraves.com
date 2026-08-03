// Drill engine for DJT Greek.
//
// Vanilla JS, no dependencies, no persistence. All state lives in memory for
// the lifetime of the session object returned by createSession().

function normalizeAnswer(value) {
  return String(value).trim().toLowerCase();
}

function resolveGlyph(item, mode) {
  if (!item) {
    return { glyph: null, form: null };
  }

  if (mode === "lower") {
    return { glyph: item.lower, form: "lower" };
  }

  if (mode === "upper") {
    if (item.hasDistinctUpper === false) {
      return { glyph: item.lower, form: "lower" };
    }
    return { glyph: item.upper, form: "upper" };
  }

  // mixed: choose once, randomly, per prompt generation.
  if (item.hasDistinctUpper === false) {
    return { glyph: item.lower, form: "lower" };
  }
  if (Math.random() < 0.5) {
    return { glyph: item.upper, form: "upper" };
  }
  return { glyph: item.lower, form: "lower" };
}

/**
 * Create a drill session.
 *
 * @param {{items: Array<object>, caseMode?: "lower"|"upper"|"mixed"}} options
 * @returns session object per the frozen engine contract.
 */
export function createSession({ items, caseMode = "lower" } = {}) {
  let pool = Array.isArray(items) ? [...items] : [];
  let mode = caseMode;

  let current = null;
  let promptGlyph = null;
  let promptForm = null;

  // Index of the currently displayed prompt. Starts at -1 so the first
  // advance() call (run below, during construction) lands on index 0.
  let promptIndex = -1;

  // undefined => current prompt has no scored submission yet. Otherwise it
  // caches the MOST RECENT result object. Only a correct result blocks
  // re-evaluation (see submit()); a wrong result is re-scored on retry.
  let submittedResult;

  // Per-prompt attempt tracking (first-attempt scoring + re-queue).
  // firstAttemptMade: whether any submit has been scored for this prompt.
  // firstAttemptCorrect: outcome of that first attempt; drives stats and
  // the miss re-queue.
  let firstAttemptMade = false;
  let firstAttemptCorrect = false;

  // itemId -> prompt index by which the item must reappear (miss index + 3).
  const missDeadlines = new Map();

  const stats = { seen: 0, correct: 0, streak: 0 };

  function pickItem(targetIndex) {
    if (pool.length === 0) {
      return null;
    }

    // Hard guarantee: a missed item must reappear within 3 prompts, but only
    // when the pool is large enough that "reappear" is meaningfully delayed.
    if (pool.length > 3) {
      for (const [itemId, deadline] of missDeadlines) {
        if (deadline !== targetIndex) continue;
        const forced = pool.find((it) => it.id === itemId);
        if (!forced) {
          // Item left the pool (setPool) - the debt can never be repaid.
          missDeadlines.delete(itemId);
          continue;
        }
        if (pool.length <= 1 || !current || forced.id !== current.id) {
          missDeadlines.delete(itemId);
          return forced;
        }
      }
    }

    // Avoid an immediate exact repeat when there's another option.
    const candidates =
      pool.length > 1 && current
        ? pool.filter((it) => it.id !== current.id)
        : pool.slice();

    // Weight recently-missed items higher so they resurface sooner.
    const weights = candidates.map((it) => (missDeadlines.has(it.id) ? 5 : 1));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    let roll = Math.random() * totalWeight;
    let picked = candidates[candidates.length - 1];
    for (let i = 0; i < candidates.length; i++) {
      roll -= weights[i];
      if (roll <= 0) {
        picked = candidates[i];
        break;
      }
    }

    if (picked && missDeadlines.has(picked.id)) {
      missDeadlines.delete(picked.id);
    }

    return picked;
  }

  function advance() {
    const targetIndex = promptIndex + 1;
    const picked = pickItem(targetIndex);

    promptIndex = targetIndex;
    current = picked;
    submittedResult = undefined;
    firstAttemptMade = false;
    firstAttemptCorrect = false;

    const resolved = resolveGlyph(picked, mode);
    promptGlyph = resolved.glyph;
    promptForm = resolved.form;
  }

  // Generate the initial prompt.
  advance();

  return {
    get current() {
      return current;
    },
    get promptGlyph() {
      return promptGlyph;
    },
    get promptForm() {
      return promptForm;
    },
    get stats() {
      return {
        seen: stats.seen,
        correct: stats.correct,
        streak: stats.streak,
        accuracy: stats.seen === 0 ? 0 : stats.correct / stats.seen,
      };
    },

    submit(input) {
      if (!current) {
        return null;
      }
      // After a CORRECT submit, further submits before next() are no-ops
      // returning the cached result. A prior WRONG result does not
      // short-circuit: every retry while the prompt is unpassed is
      // re-scored for real. (While retrying, the expected sound is visible
      // in the "✗ {display}" feedback — the user typing the answer they
      // can see is deliberate type-what-you-see reinforcement, not a
      // loophole.)
      if (submittedResult !== undefined && submittedResult.correct) {
        return submittedResult;
      }

      const normalizedInput = normalizeAnswer(input);
      const expected = current.answers;
      const correct = expected
        .map(normalizeAnswer)
        .includes(normalizedInput);

      // First-attempt scoring: only the FIRST attempt on each prompt
      // touches stats. Retries (attempt 2..n), including the eventual
      // correct one, change nothing — seen counts prompts first-attempted,
      // correct counts first-try successes, streak counts consecutive
      // first-try-correct prompts (reset by a wrong first attempt).
      if (!firstAttemptMade) {
        firstAttemptMade = true;
        firstAttemptCorrect = correct;
        stats.seen += 1;
        if (correct) {
          stats.correct += 1;
          stats.streak += 1;
        } else {
          stats.streak = 0;
        }
      }

      // Re-queue is anchored to the PASS moment, not the miss: while the
      // user retries, the item never leaves the screen, so scheduling on
      // the wrong attempt would be consumed by the retry itself.
      if (correct) {
        if (firstAttemptCorrect) {
          // Passed first-try: clear any stale debt from an earlier miss.
          missDeadlines.delete(current.id);
        } else {
          // Missed on the first attempt, eventually passed: must resurface
          // within 3 prompts of this pass (promptIndex has not moved
          // during retries).
          missDeadlines.set(current.id, promptIndex + 3);
        }
      }

      const result = { correct, expected, item: current };
      submittedResult = result;
      return result;
    },

    next() {
      // Engine-enforced retry loop: the drill only advances once the
      // current prompt has a correct submission. Otherwise next() is a
      // no-op — no caller can skip a glyph after a wrong answer.
      // (Construction-time init and setPool() advance via the private
      // advance() directly, so they are not subject to this guard.)
      if (!current) {
        return;
      }
      if (submittedResult === undefined || submittedResult.correct !== true) {
        return;
      }
      advance();
    },

    setPool(newItems) {
      pool = Array.isArray(newItems) ? [...newItems] : [];
      const stillPresent = current && pool.some((it) => it.id === current.id);
      if (!stillPresent) {
        current = null;
        advance();
      }
    },

    setCaseMode(newMode) {
      mode = newMode;
    },

    reset() {
      stats.seen = 0;
      stats.correct = 0;
      stats.streak = 0;
      missDeadlines.clear();
      // Clear per-prompt attempt state: the prompt on screen (if any) is
      // treated as never-attempted — the next submit is a fresh first
      // attempt, and no pre-reset miss carries re-queue debt across.
      submittedResult = undefined;
      firstAttemptMade = false;
      firstAttemptCorrect = false;
    },
  };
}
