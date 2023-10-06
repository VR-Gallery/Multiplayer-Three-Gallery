'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Artworks } from '@/components/group/artworks';
import { socket } from '@/utils/socket';
import OtherPlayer from '@/components/gameObjects/otherPlayer';

const Player = dynamic(() => import('@/components/gameObjects/player'), {
  ssr: false,
});

const Gallery = dynamic(() => import('@/components/gameObjects/gallery'), {
  ssr: false,
});

const useOtherPlayersUpdate = () => {
  const [otherPlayers, setOtherPlayers] = useState<any[]>([]);

  useEffect(() => {
    function playerUpdate(playersList: any[]) {
      const players = playersList.filter((player) => player.id !== socket.id);
      setOtherPlayers(players);
    }

    socket.on('player:update', playerUpdate);

    return () => {
      socket.off('player:update', playerUpdate);
    };
  }, []);

  return otherPlayers;
};

export default function Page() {
  const otherPlayers = useOtherPlayersUpdate();
  console.log(otherPlayers);

  return (
    <Suspense fallback={null}>
      {/* <Perf /> */}
      <Environment files='/sky.hdr' background={true} />
      {/* <OrbitControls /> */}
      <Artworks />
      <Player scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
      <Gallery />
      {otherPlayers.map(
        ({
          id,
          position,
          rotation,
          playAnimation,
          dailySessionId,
          name,
          useModelType,
        }) => (
          <OtherPlayer
            key={id}
            position={position}
            rotation={rotation}
            name={name}
            playAnimation={playAnimation}
          />
        ),
      )}
    </Suspense>
  );
}
