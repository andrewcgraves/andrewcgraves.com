// audio.js — Pronounce glyphs via the browser SpeechSynthesis Web Speech API.
//
// Known limitation: browser TTS on an isolated Greek letter often speaks the
// letter NAME, not the phonetic sound. speak() is best-effort. Presenting
// this limitation to the user (or working around it in UI copy) is another
// module's job.

const hasWindow = typeof window !== "undefined";
const synth = hasWindow ? window.speechSynthesis : undefined;
const supported = Boolean(synth) && typeof synth.getVoices === "function";

// Cache of available voices, refreshed as they load (voice lists often
// populate asynchronously via the `voiceschanged` event).
let cachedVoices = supported ? synth.getVoices() : [];

function refreshVoices() {
  cachedVoices = synth.getVoices();
}

if (supported && typeof synth.addEventListener === "function") {
  synth.addEventListener("voiceschanged", refreshVoices);
} else if (supported) {
  // Fallback for environments without addEventListener on synth.
  synth.onvoiceschanged = refreshVoices;
}

function pickVoice(lang) {
  if (!cachedVoices || cachedVoices.length === 0) return undefined;

  const prefix = String(lang || "").slice(0, 2).toLowerCase();
  const exact = cachedVoices.find(
    (voice) => voice.lang && voice.lang.toLowerCase() === String(lang).toLowerCase()
  );
  if (exact) return exact;

  const byPrefix = cachedVoices.find(
    (voice) => voice.lang && voice.lang.toLowerCase().startsWith(prefix)
  );
  if (byPrefix) return byPrefix;

  return cachedVoices[0];
}

/**
 * Whether speech synthesis is usable in this environment: the API exists
 * AND at least one voice is available.
 * @returns {boolean}
 */
export function isSupported() {
  if (!supported) return false;
  // Voices may have loaded since module init; re-check live.
  try {
    const voices = synth.getVoices();
    if (voices && voices.length > 0) {
      cachedVoices = voices;
      return true;
    }
  } catch {
    return false;
  }
  return cachedVoices.length > 0;
}

/**
 * Speak the given glyph/text string using the Web Speech API.
 * No-op (and resolves) if speech synthesis is unsupported or unavailable.
 * @param {string} text
 * @param {string} [lang="el-GR"]
 * @returns {Promise<void>}
 */
export function speak(text, lang = "el-GR") {
  return new Promise((resolve) => {
    if (!supported || !text) {
      resolve();
      return;
    }

    try {
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      const voice = pickVoice(lang);
      if (voice) {
        utterance.voice = voice;
      } else if (cachedVoices.length === 0) {
        // No voices available at all: nothing meaningful to speak.
        resolve();
        return;
      }

      let settled = false;
      const finish = () => {
        if (!settled) {
          settled = true;
          resolve();
        }
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      synth.speak(utterance);
    } catch {
      resolve();
    }
  });
}
