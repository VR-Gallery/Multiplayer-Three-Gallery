import { PublicApi } from '@react-three/cannon';
import { PlayerEvent } from '../hooks/usePlayerEventHandler';

export type TeleportationPlayerEvent = {
  event: 'teleportation';
  payload: {
    position: [number, number, number];
  };
};

export const teleportationEventHandler =
  (next: any) => (playerEvent: PlayerEvent, api: PublicApi) => {
    if (playerEvent.event !== 'teleportation') {
      return next ? next(playerEvent, api) : playerEvent;
    }
    const [x, y, z] = playerEvent.payload
      .position as TeleportationPlayerEvent['payload']['position'];
    api.position.set(x, y, z);
  };
