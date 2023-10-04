import { useAnimations } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Object3D, AnimationAction, AnimationClip } from 'three';

type GLTFActions = Record<string, THREE.AnimationAction>;

type ActionConfig<T> = {
  [key in keyof T]: {
    fadeIn: number;
    fadeOut: number;
    defaultAction?: boolean;
  };
};

export function useAnimationController<T extends GLTFActions>(
  animations: AnimationClip[],
  config: ActionConfig<T>,
) {
  const { ref, actions } = useAnimations(animations);
  const defaultAction = useMemo(
    () =>
      (Object.keys(config).find((key) => config[key].defaultAction) ??
        Object.keys(config)[0]) as keyof T,
    [config],
  );
  const [playAction, setPlayAction] = useState<keyof T>(defaultAction);
  const [lastAction, setLastAction] = useState<keyof T>(defaultAction);

  const onChangeAction = (action: keyof T) => {
    setPlayAction(action);
  };

  useEffect(() => {
    if (actions[defaultAction as string]) {
      actions[defaultAction]?.reset();
      actions[defaultAction]?.play();
    }
  }, [actions]);

  useEffect(() => {
    if (
      playAction !== lastAction &&
      actions[lastAction as string] &&
      config[lastAction]?.fadeOut
    ) {
      actions[lastAction]?.fadeOut(config[lastAction]?.fadeOut || 0);
    }
    if (playAction !== lastAction && actions[playAction as string]) {
      actions[playAction]?.reset();
      actions[playAction]?.fadeIn(config[playAction as string]?.fadeIn || 0);
      actions[playAction]?.play();
      setLastAction(playAction);
    }
  }, [playAction, actions]);

  return { ref, onChangeAction, playAction, lastAction };
}
