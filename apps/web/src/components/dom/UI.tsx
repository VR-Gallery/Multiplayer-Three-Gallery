'use client';

import { ui } from '@/components/dom/global';

/**
 * @ 渲染到canvas
 */
export const UI = ({ children }: { children: React.ReactNode }) => {
  return <ui.In>{children}</ui.In>;
};
