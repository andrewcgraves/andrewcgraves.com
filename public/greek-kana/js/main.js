// main.js — Bootstrap / wiring for DJT Greek.
//
// This module contains no business logic: it wires together data, the
// drill engine, the UI, and the audio module, then boots the app.

import { GREEK_DATA } from "./data.js";
import { createSession } from "./engine.js";
import { initUI } from "./ui.js";
import * as audio from "./audio.js";

const mountIds = {
  app: "app",
  promptGlyph: "prompt-glyph",
  answerInput: "answer-input",
  feedback: "feedback",
  playSound: "play-sound",
  caseMode: "case-mode",
  statsBar: "stats-bar",
  selectionToggle: "selection-toggle",
  selectionGrid: "selection-grid",
};

function boot() {
  const vowelsGroup = GREEK_DATA.groups.find((group) => group.id === "vowels");
  const items = vowelsGroup ? vowelsGroup.items : [];

  const session = createSession({ items, caseMode: "lower" });

  initUI({ mountIds, data: GREEK_DATA, session, audio });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
