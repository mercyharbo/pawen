"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        duration: 1.35,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      }}
    >
      {children}
    </ReactLenis>
  );
}
