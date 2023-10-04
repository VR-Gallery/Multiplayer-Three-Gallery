import { Layout } from '@/components/dom/Layout';
import '@/global.css';

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='antialiased'>
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
