'use client';

import { useGLTF, useAnimations, CameraControls } from '@react-three/drei';
import { useCylinder, useSphere } from '@react-three/cannon';
import { useAnimationController } from '@/hooks/useAnimationController';
import { ManModel, GLTFResult } from './components/Man';
import { RefObject, useEffect, useRef } from 'react';
import { usePlayerControl } from './hooks/usePlayerControl';

type ActionName = 'idle' | 'walk';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Player(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials, animations } = useGLTF(
    '/player/man.glb',
  ) as unknown as GLTFResult;

  const { ref, onChangeAction, playAction, lastAction } =
    useAnimationController<GLTFActions>(animations, {
      idle: {
        defaultAction: true,
        fadeIn: 0.2,
        fadeOut: 0.2,
      },
      walk: {
        fadeIn: 0.2,
        fadeOut: 0.5,
      },
    });

  const cameraControlRef = useRef<CameraControls | null>(null);

  const [cylindeRef, api] = useCylinder(() => ({
    mass: 10,
    fixedRotation: true,
    position: [-4, 2, -2],
    args: [0.1, 0.1, 0.9],
    material: {
      friction: 0.01,
    },
  }));

  const { isFirstPerson, animation } = usePlayerControl({
    playerPysicsApi: api,
    cameraControlRef,
  });

  useEffect(() => {
    if (playAction !== animation) {
      onChangeAction(animation as ActionName);
    }
  }, [animation]);

  return (
    <>
      <CameraControls ref={cameraControlRef} makeDefault />
      <group ref={cylindeRef as RefObject<THREE.Group>}>
        <ManModel
          {...props}
          scale={0.5}
          position={[0, -0.4, 0]}
          nodes={nodes}
          materials={materials}
          animationRef={ref}
          visible={!isFirstPerson}
        />
      </group>
    </>
  );
}
