'use client';

import dynamic from 'next/dynamic';
import { ui } from './global';

const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=' relative h-full w-full'>
      <Scene
        className='fixed left-0 top-0 h-screen w-screen'
        eventPrefix='client'
      >
        {children}
      </Scene>
      <ui.Out />
    </div>
  );
};

export { Layout };
