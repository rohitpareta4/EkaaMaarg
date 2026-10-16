
"use client";

import { useEffect, useState } from "react";

type WelcomeVoiceProps = {
  message: string;
};

export default function WelcomeVoice({
  message,
}: WelcomeVoiceProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(
      "speechSynthesis" in window &&
        "SpeechSynthesisUtterance" in window
    );

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function speakMessage() {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function stopMessage() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  if (!supported) {
    return (
      <p className="mt-3 text-sm text-gray-600">
        Voice playback is not supported in this browser.
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={speakMessage}
        className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
      >
        {speaking ? "🔊 Play Again" : "🔊 Listen to Welcome"}
      </button>

      {speaking && (
        <button
          type="button"
          onClick={stopMessage}
          className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
        >
          Stop
        </button>
      )}
    </div>
  );
}
