import { useEffect, useRef, useCallback } from "react";

const sounds = {
  themeChange: "/sounds/bgchange.mp3",
} as const;

const useSound = (soundType: keyof typeof sounds) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initialized = useRef(false);

  const initializeAudio = useCallback(() => {
    if (initialized.current) return;

    try {
      const audio = new Audio(sounds[soundType]);
      audio.preload = "auto";
      audioRef.current = audio;
      initialized.current = true;
    } catch (error) {
      console.warn("Audio initialization failed:", error);
    }
  }, [soundType]);

  const playSound = useCallback(() => {
    try {
      if (!initialized.current) {
        initializeAudio();
      }

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        return audioRef.current.play();
      }
    } catch (error) {
      console.warn("Playback failed:", error);
    }
  }, [initializeAudio]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      initialized.current = false;
    };
  }, []);

  return playSound;
};

export default useSound;
