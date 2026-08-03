// ui.js — DOM rendering + event wiring for DJT Greek.
//
// Vanilla JS, no dependencies. This module never reads/writes any storage
// API (no localStorage, sessionStorage, document.cookie, or IndexedDB) —
// all state (current selection, case mode) lives in memory for the
// lifetime of the page.

const CASE_MODES = ["lower", "upper", "mixed"];
const CASE_BUTTON_IDS = {
  lower: "case-lowercase",
  upper: "case-uppercase",
  mixed: "case-mixed",
};
const DEFAULT_GROUP_ID = "vowels";

/**
 * Wire up the drill UI against the frozen mount points.
 *
 * @param {{
 *   mountIds: Record<string, string>,
 *   data: {groups: Array<{id: string, label: string, items: Array<object>}>},
 *   session: object,
 *   audio: {speak: Function, isSupported: Function},
 * }} deps
 */
export function initUI({ mountIds, data, session, audio }) {
  const els = {
    app: document.getElementById(mountIds.app),
    promptGlyph: document.getElementById(mountIds.promptGlyph),
    answerInput: document.getElementById(mountIds.answerInput),
    feedback: document.getElementById(mountIds.feedback),
    playSound: document.getElementById(mountIds.playSound),
    caseMode: document.getElementById(mountIds.caseMode),
    statsBar: document.getElementById(mountIds.statsBar),
    selectionToggle: document.getElementById(mountIds.selectionToggle),
    selectionGrid: document.getElementById(mountIds.selectionGrid),
  };

  const answerForm = els.answerInput ? els.answerInput.closest("form") : null;

  // itemId -> currently enabled (selected for the drill pool).
  const enabled = new Set();

  // itemId -> the .sel-item toggle button rendered for it, so individual
  // and group-level updates can flip aria-pressed without rebuilding the
  // whole grid (which would blow away focus/scroll position).
  const itemButtons = new Map();

  let caseMode = "lower";
  let audioSupported = Boolean(
    audio && typeof audio.isSupported === "function" && audio.isSupported()
  );
  let submitting = false;

  function findDefaultGroup() {
    return (
      data.groups.find((group) => group.id === DEFAULT_GROUP_ID) ||
      data.groups[0] ||
      null
    );
  }

  function setDefaultSelection() {
    enabled.clear();
    const defaultGroup = findDefaultGroup();
    if (defaultGroup) {
      for (const item of defaultGroup.items) {
        enabled.add(item.id);
      }
    }
  }

  function enabledItems() {
    const out = [];
    for (const group of data.groups) {
      for (const item of group.items) {
        if (enabled.has(item.id)) out.push(item);
      }
    }
    return out;
  }

  function syncItemButtonState(itemId) {
    const btn = itemButtons.get(itemId);
    if (btn) {
      btn.setAttribute("aria-pressed", String(enabled.has(itemId)));
    }
  }

  function syncAllItemButtons() {
    for (const itemId of itemButtons.keys()) {
      syncItemButtonState(itemId);
    }
  }

  // ---- Prompt / feedback / stats rendering -------------------------------

  function renderPrompt() {
    if (!els.promptGlyph) return;
    const poolEmpty = enabledItems().length === 0;

    if (poolEmpty) {
      els.promptGlyph.textContent = "Pick at least one character";
      els.promptGlyph.classList.add("prompt-empty");
      if (els.answerInput) els.answerInput.disabled = true;
    } else {
      els.promptGlyph.textContent = session.promptGlyph || "";
      els.promptGlyph.classList.remove("prompt-empty");
      if (els.answerInput) els.answerInput.disabled = false;
    }

    renderPlaySoundState(poolEmpty);
  }

  function renderPlaySoundState(poolEmptyArg) {
    if (!els.playSound) return;
    const poolEmpty =
      typeof poolEmptyArg === "boolean" ? poolEmptyArg : enabledItems().length === 0;
    els.playSound.disabled = poolEmpty || !audioSupported;
    els.playSound.textContent = "🔊 Say letter (letter name)";
    els.playSound.setAttribute(
      "aria-label",
      "Say letter name via text-to-speech (may not match the correct pronunciation)"
    );
    els.playSound.title =
      "Plays the Greek letter's name using the device's text-to-speech voice; this may differ from the correct phonetic sound.";
  }

  function clearFeedback() {
    if (!els.feedback) return;
    els.feedback.textContent = "";
    els.feedback.classList.remove("correct", "incorrect");
  }

  function showFeedback(result) {
    if (!els.feedback || !result) return;
    if (result.correct) {
      els.feedback.textContent = "✓ Correct";
      els.feedback.classList.remove("incorrect");
      els.feedback.classList.add("correct");
    } else {
      const expectedDisplay = result.item ? result.item.display : "";
      els.feedback.textContent = `✗ ${expectedDisplay}`;
      els.feedback.classList.remove("correct");
      els.feedback.classList.add("incorrect");
    }
  }

  function renderStats() {
    if (!els.statsBar) return;
    const s = session.stats;
    const seenEl = els.statsBar.querySelector("#stat-seen");
    const correctEl = els.statsBar.querySelector("#stat-correct");
    const streakEl = els.statsBar.querySelector("#stat-streak");
    const accEl = els.statsBar.querySelector("#stat-accuracy");
    if (seenEl) seenEl.textContent = `Seen: ${s.seen}`;
    if (correctEl) correctEl.textContent = `Correct: ${s.correct}`;
    if (streakEl) streakEl.textContent = `Streak: ${s.streak}`;
    if (accEl) accEl.textContent = `Accuracy: ${Math.round(s.accuracy * 100)}%`;
  }

  function focusAnswerInput() {
    if (els.answerInput && !els.answerInput.disabled) {
      els.answerInput.focus();
    }
  }

  // ---- Answer submission --------------------------------------------------

  function handleSubmit(event) {
    if (event) event.preventDefault();
    if (submitting) return;
    if (!els.answerInput || els.answerInput.disabled) return;

    const value = els.answerInput.value.trim();
    if (!value) return;

    submitting = true;
    const result = session.submit(value);
    showFeedback(result);
    els.answerInput.value = "";
    // Only advance on a correct answer. On a wrong answer the SAME prompt
    // stays on screen (same item, same glyph, same case form) and the user
    // retries until correct. The expected sound is visible in the
    // "✗ {display}" feedback while retrying — typing the answer you can
    // see is deliberate type-what-you-see reinforcement, not a loophole.
    if (result && result.correct) {
      session.next();
    }
    renderStats();
    renderPrompt();
    submitting = false;
    focusAnswerInput();
  }

  if (answerForm) {
    answerForm.addEventListener("submit", handleSubmit);
  }

  // ---- Case mode radiogroup -----------------------------------------------

  function setupCaseModeControls() {
    if (!els.caseMode) return;

    const buttons = CASE_MODES.map((mode) =>
      document.getElementById(CASE_BUTTON_IDS[mode])
    ).filter(Boolean);

    buttons.forEach((btn) => btn.classList.add("case-btn"));

    function applySelection(mode) {
      buttons.forEach((btn, i) => {
        const isSelected = CASE_MODES[i] === mode;
        btn.setAttribute("aria-checked", String(isSelected));
        btn.tabIndex = isSelected ? 0 : -1;
      });
    }

    function selectMode(mode, { focusButton = false } = {}) {
      caseMode = mode;
      applySelection(mode);
      session.setCaseMode(mode);
      if (focusButton) {
        const idx = CASE_MODES.indexOf(mode);
        if (buttons[idx]) buttons[idx].focus();
      }
    }

    buttons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        selectMode(CASE_MODES[i], { focusButton: false });
      });
    });

    els.caseMode.addEventListener("keydown", (event) => {
      const key = event.key;
      if (
        key !== "ArrowLeft" &&
        key !== "ArrowRight" &&
        key !== "ArrowUp" &&
        key !== "ArrowDown"
      ) {
        return;
      }
      event.preventDefault();
      const idx = CASE_MODES.indexOf(caseMode);
      let nextIdx;
      if (key === "ArrowLeft" || key === "ArrowUp") {
        nextIdx = (idx - 1 + CASE_MODES.length) % CASE_MODES.length;
      } else {
        nextIdx = (idx + 1) % CASE_MODES.length;
      }
      selectMode(CASE_MODES[nextIdx], { focusButton: true });
    });

    // Initialize roving tabindex / aria-checked without re-notifying the
    // engine (it already defaults to the same "lower" mode).
    applySelection(caseMode);
  }

  // ---- Selection panel ------------------------------------------------------

  function onSelectionChanged() {
    session.setPool(enabledItems());
    renderPrompt();
  }

  function buildItemButton(item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sel-item";
    btn.setAttribute("aria-pressed", String(enabled.has(item.id)));

    const glyphSpan = document.createElement("span");
    glyphSpan.className = "glyph";
    glyphSpan.textContent = item.lower;

    const soundSpan = document.createElement("span");
    soundSpan.className = "sound";
    soundSpan.textContent = item.display;

    btn.appendChild(glyphSpan);
    btn.appendChild(soundSpan);

    const label =
      item.name && item.name.trim().length > 0
        ? `${item.name}, sound ${item.display}`
        : `${item.lower}, sound ${item.display}`;
    btn.setAttribute("aria-label", label);

    btn.addEventListener("click", () => {
      if (enabled.has(item.id)) {
        enabled.delete(item.id);
      } else {
        enabled.add(item.id);
      }
      syncItemButtonState(item.id);
      onSelectionChanged();
    });

    itemButtons.set(item.id, btn);
    return btn;
  }

  function buildGroupSection(group) {
    const groupEl = document.createElement("div");
    groupEl.className = "sel-group";

    const header = document.createElement("div");
    header.className = "sel-group-header";

    const heading = document.createElement("h3");
    heading.textContent = group.label;
    header.appendChild(heading);

    const checkAllBtn = document.createElement("button");
    checkAllBtn.type = "button";
    checkAllBtn.className = "group-btn";
    checkAllBtn.textContent = "Check all";
    checkAllBtn.addEventListener("click", () => {
      for (const item of group.items) {
        enabled.add(item.id);
        syncItemButtonState(item.id);
      }
      onSelectionChanged();
    });

    const uncheckAllBtn = document.createElement("button");
    uncheckAllBtn.type = "button";
    uncheckAllBtn.className = "group-btn";
    uncheckAllBtn.textContent = "Uncheck all";
    uncheckAllBtn.addEventListener("click", () => {
      for (const item of group.items) {
        enabled.delete(item.id);
        syncItemButtonState(item.id);
      }
      onSelectionChanged();
    });

    header.appendChild(checkAllBtn);
    header.appendChild(uncheckAllBtn);
    groupEl.appendChild(header);

    const itemsEl = document.createElement("div");
    itemsEl.className = "sel-items";
    for (const item of group.items) {
      itemsEl.appendChild(buildItemButton(item));
    }
    groupEl.appendChild(itemsEl);

    return groupEl;
  }

  function handleReset() {
    session.reset();
    setDefaultSelection();
    syncAllItemButtons();
    session.setPool(enabledItems());
    clearFeedback();
    if (els.answerInput) els.answerInput.value = "";
    renderStats();
    renderPrompt();
    focusAnswerInput();
  }

  function buildSelectionGrid() {
    if (!els.selectionGrid) return;
    els.selectionGrid.innerHTML = "";
    itemButtons.clear();

    for (const group of data.groups) {
      els.selectionGrid.appendChild(buildGroupSection(group));
    }

    // The frozen mount ids don't include a reset button element — it lives
    // inside the selection-grid mount point, which is an allowed place to
    // create new elements.
    const resetWrap = document.createElement("div");
    resetWrap.className = "sel-reset-wrap";
    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.id = "reset-btn";
    resetBtn.textContent = "Reset session";
    resetBtn.addEventListener("click", handleReset);
    resetWrap.appendChild(resetBtn);
    els.selectionGrid.appendChild(resetWrap);
  }

  // ---- Play sound -----------------------------------------------------------

  function recheckAudioSupport() {
    if (!audioSupported && audio && typeof audio.isSupported === "function") {
      audioSupported = audio.isSupported();
      renderPlaySoundState();
    }
  }

  function setupPlaySound() {
    if (!els.playSound) return;

    els.playSound.addEventListener("click", () => {
      recheckAudioSupport();
      if (!audioSupported) return;
      if (audio && typeof audio.speak === "function") {
        audio.speak(session.promptGlyph);
      }
    });

    // Voice lists can populate asynchronously after the page loads, so
    // isSupported() may flip from false to true. Recheck once on the first
    // user interaction inside the app mount, in addition to the click-time
    // check above.
    const recheckOnce = () => {
      recheckAudioSupport();
      if (els.app) {
        els.app.removeEventListener("pointerdown", recheckOnce);
        els.app.removeEventListener("keydown", recheckOnce);
      }
    };
    if (els.app) {
      els.app.addEventListener("pointerdown", recheckOnce, { once: true });
      els.app.addEventListener("keydown", recheckOnce, { once: true });
    }
  }

  // ---- Init -------------------------------------------------------------

  setDefaultSelection();
  buildSelectionGrid();
  setupCaseModeControls();
  setupPlaySound();

  // Make sure the engine's pool matches the default (vowels-only)
  // selection regardless of how the session was constructed.
  session.setPool(enabledItems());

  renderStats();
  renderPrompt();
  focusAnswerInput();
}
