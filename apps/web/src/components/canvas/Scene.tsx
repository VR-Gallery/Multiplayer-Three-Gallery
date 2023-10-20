'use client';

import { Canvas, CanvasProps } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';

export default function Scene({ children, ...props }: CanvasProps) {
  return (
    <Canvas {...props}>
      <Physics>
        {/* <Debug color='black'> */}
        {children}
        {/* </Debug> */}
      </Physics>
      <Preload all />
    </Canvas>
  );
}
