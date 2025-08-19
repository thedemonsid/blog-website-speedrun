'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Howl } from 'howler';
export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = React.useCallback(() => {
    // Play a subtle, short sound effect when toggling theme
    const sound = new Howl({
      src: ['/sounds/mouse-click.mp3'],
      volume: 0.18, // Lower volume for subtlety
      sprite: {
        toggle: [0, 350], // Play only the first 350ms for a gentle effect
      },
    });
    sound.play('toggle');
    try {
      setTheme(theme === 'light' ? 'dark' : 'light');
    } catch (error) {
      console.log(error);

      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [setTheme, theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
