'use client';

import { useGLTF, CameraControls } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { useAnimationController } from '@/hooks/useAnimationController';
import {
  ManModel,
  GLTFResult,
} from '@/components/gameObjects/player/components/Man';
import { FC, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { usePlayerControl } from './hooks/usePlayerControl';
import { Euler, Group, Vector3 } from 'three';
import { SkeletonUtils } from 'three-stdlib';
import { useFrame, useGraph } from '@react-three/fiber';

type ActionName = 'idle' | 'walk';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const Player: FC<
  JSX.IntrinsicElements['group'] & {
    position: [number, number, number];
    rotation: [number, number, number];
    playAnimation: string;
  }
> = (props) => {
  const {
    position: realPosition,
    rotation: realRotation,
    name,
    playAnimation,
    ...rest
  } = props;
  const { scene, animations } = useGLTF(
    '/player/man.glb',
  ) as unknown as GLTFResult;
  const copiedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(copiedScene) as GLTFResult;

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

  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  useFrame(() => {
    setPosition((position) => {
      const [x, y, z] = position;
      const [realX, realY, realZ] = realPosition;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
    setRotation((rotation) => {
      const [x, y, z] = rotation;
      const [realX, realY, realZ] = realRotation;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
  });

  useEffect(() => {
    if (playAction !== playAnimation) {
      onChangeAction(playAnimation as ActionName);
    }
  }, [playAnimation]);

  return (
    <>
      <group>
        <ManModel
          {...rest}
          scale={0.5}
          position={position as unknown as Vector3}
          rotation={rotation as unknown as Euler}
          nodes={nodes}
          materials={materials}
          animationRef={ref}
          visible={true}
        />
      </group>
    </>
  );
};

export default Player;
