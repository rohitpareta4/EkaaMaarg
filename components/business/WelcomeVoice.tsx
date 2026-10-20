
"use client";

import { useEffect, useRef, useState } from "react";

type WelcomeVoiceProps = {
  message: string;
  audioSrc?: string;
};

export default function WelcomeVoice({
  message,
  audioSrc = "/audio/sanjay_electricals.mp3",
}: WelcomeVoiceProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [speaking, setSpeaking] = useState(false);
  const [useBrowserVoice, setUseBrowserVoice] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
    };
  }, []);

  function speakWithBrowser() {
    if (!("speechSynthesis" in window)) {
      setSpeaking(false);
      console.error("Browser speech is not supported.");
      return;
    }

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

  async function speakMessage() {
    const audio = audioRef.current;

    if (!audio || useBrowserVoice) {
      speakWithBrowser();
      return;
    }

    window.speechSynthesis?.cancel();
    audio.pause();
    audio.currentTime = 0;

    try {
      await audio.play();
    } catch (error) {
      console.warn(
        "Saved audio unavailable. Using browser voice instead.",
        error
      );

      audio.pause();
      audio.currentTime = 0;
      setUseBrowserVoice(true);
      speakWithBrowser();
    }
  }

  function stopMessage() {
    audioRef.current?.pause();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        onPlay={() => setSpeaking(true)}
        onEnded={() => setSpeaking(false)}
        onPause={() => setSpeaking(false)}
        onError={() => setUseBrowserVoice(true)}
      />

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
