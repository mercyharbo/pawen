"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type MotionRevealProps = {
  ariaHidden?: boolean;
  as?: "article" | "div";
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "scale-in" | "image-reveal";
  delay?: number;
};

const revealVariants: Record<NonNullable<MotionRevealProps["variant"]>, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40, filter: "blur(16px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.94, filter: "blur(14px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "image-reveal": {
    hidden: { opacity: 0, scale: 1.08, filter: "blur(18px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
};

export function MotionReveal({
  ariaHidden = false,
  as = "div",
  children,
  className,
  variant = "fade-up",
  delay = 0,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();
  const StaticComponent = as;
  const MotionComponent = as === "article" ? motion.article : motion.div;

  if (reduceMotion) {
    return (
      <StaticComponent aria-hidden={ariaHidden || undefined} className={className}>
        {children}
      </StaticComponent>
    );
  }

  return (
    <MotionComponent
      aria-hidden={ariaHidden || undefined}
      className={className}
      variants={revealVariants[variant]}
      initial="hidden"
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, amount: 0.32 }}
      whileInView="visible"
    >
      {children}
    </MotionComponent>
  );
}
