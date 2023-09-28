'use client';

import { usePlane } from '@react-three/cannon';
import { RefObject } from 'react';

export default function Floor(props: JSX.IntrinsicElements['group']) {
  const [planeRef, api] = usePlane(() => ({
    mass: 0,
    fixedRotation: true,
    position: [0, -2, 0],
    rotation: [-Math.PI / 2, 0, 0],
    args: [10],
    material: {
      friction: 0.5,
    },
  }));

  return (
    <group {...props} ref={planeRef as RefObject<THREE.Group>}>
      <mesh>
        <planeBufferGeometry args={[10, 10]} />
        <meshBasicMaterial color='red' />
      </mesh>
    </group>
  );
}
