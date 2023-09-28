'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { useCylinder, useSphere } from '@react-three/cannon';
import { useAnimationController } from '@/hooks/useAnimationController';
import { ManModel, GLTFResult } from './components/Man';
import { RefObject, useEffect } from 'react';

type ActionName = 'idle' | 'walk';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Dog(props: JSX.IntrinsicElements['group']) {
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
  
  const [cylindeRef, api] = useCylinder(() => ({
    mass: 100,
    fixedRotation: true,
    position: [0, 1, 0],
    args: [0.3, 0.3, 3.5],
    material: {
      friction: 0,
    },
  }));

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'w') {
        onChangeAction('walk');
        api.velocity.set(0, 0, -10);
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'w') {
        onChangeAction('idle');
        api.velocity.set(0, 0, 0);
      }
    });
  }, []);

  return (
    <group ref={cylindeRef as RefObject<THREE.Group>}>
      <ManModel
        {...props}
        nodes={nodes}
        materials={materials}
        animationRef={ref}
      />
    </group>
  );
}
