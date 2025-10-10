import { create } from 'zustand';
import { Theme, PlaybackSpeed } from '../types';

interface UiState {
  theme: Theme;
  playbackSpeed: PlaybackSpeed;
  toggleTheme: () => void;
  setPlaybackSpeed: (speed: PlaybackSpeed) => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: (localStorage.getItem('theme') as Theme) || 'dark',
  playbackSpeed: 1,

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return { theme: newTheme };
    }),

  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
}));
