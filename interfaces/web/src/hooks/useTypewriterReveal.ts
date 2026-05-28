/**
 * @fileoverview Types operational log lines character-by-character when enabled.
 */

// Core
import { useEffect, useState } from 'react';

interface UseTypewriterRevealOptions {
  text: string;
  enabled: boolean;
  speedMs?: number;
}

interface UseTypewriterRevealResult {
  displayedText: string;
  isComplete: boolean;
}

/* *************************************************************************************************
 ********************************************** HOOK ***********************************************
 ************************************************************************************************ */

/**
 * Reveals `text` one character at a time.
 * When disabled or reduced motion, returns full text immediately.
 */
export const useTypewriterReveal = ({
  text,
  enabled,
  speedMs = 18,
}: UseTypewriterRevealOptions): UseTypewriterRevealResult => {
  const [displayedText, setDisplayedText] = useState<string>(enabled ? '' : text);
  const [isComplete, setIsComplete] = useState<boolean>(!enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return (): void => {};
    }

    const prefersReducedMotion: boolean = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return (): void => {};
    }

    setDisplayedText('');
    setIsComplete(false);
    let index = 0;
    const timerId: ReturnType<typeof setInterval> = setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        setIsComplete(true);
        clearInterval(timerId);
      }
    }, speedMs);

    return (): void => {
      clearInterval(timerId);
    };
  }, [text, enabled, speedMs]);

  return { displayedText, isComplete };
};
