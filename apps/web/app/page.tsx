'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { OrbitControls } from '@react-three/drei';
import Floor from '@/components/gameObects/floor';

const Player = dynamic(() => import('@/components/gameObects/player'), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <Perf />
        <OrbitControls />
        <Perf />
        <Player scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
        <Floor />
      </Suspense>
    </>
  );
}
