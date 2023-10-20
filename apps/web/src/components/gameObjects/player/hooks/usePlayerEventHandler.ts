'use client';

import { create } from 'zustand';
import {
  TeleportationPlayerEvent,
  teleportationEventHandler,
} from '../events/teleportationEventHandler';
import { PublicApi } from '@react-three/cannon';
import { useEffect } from 'react';

export type PlayerEvent = TeleportationPlayerEvent;

export type PlayerEventState = {
  playerEvents: PlayerEvent[];
  pushPlayerEvent: (event: PlayerEvent) => void;
  clearPlayerEvents: () => void;
};

export const usePlayerEventStore = create<PlayerEventState>((set, get) => ({
  playerEvents: [],
  pushPlayerEvent: (event) =>
    set((state) => ({ playerEvents: [...state.playerEvents, event] })),
  clearPlayerEvents: () => set({ playerEvents: [] }),
}));

export const usePlayerEventHandler = (api: PublicApi) => {
  const { clearPlayerEvents, playerEvents } = usePlayerEventStore();
  const handlePlayerEvents = teleportationEventHandler(null);

  useEffect(() => {
    if (playerEvents.length === 0) {
      return;
    }
    playerEvents.forEach((playerEvent) => {
      handlePlayerEvents(playerEvent, api);
    });

    clearPlayerEvents();
  }, [playerEvents, handlePlayerEvents, clearPlayerEvents]);
};
