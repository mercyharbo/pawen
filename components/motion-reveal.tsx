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
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "image-reveal": {
    hidden: { opacity: 0, scale: 1.04, filter: "blur(12px)" },
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
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.28 }}
      whileInView="visible"
    >
      {children}
    </MotionComponent>
  );
}
