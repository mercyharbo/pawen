"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpNumberProps = {
  className?: string;
  suffix?: string;
  target: number;
};

const formatter = new Intl.NumberFormat("en-US");

export function CountUpNumber({
  className,
  suffix = "",
  target,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.6, once: true });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    if (!isInView) {
      return;
    }

    const controls = animate(1, target, {
      duration: 1.35,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, target]);

  const displayValue = reduceMotion ? target : value;

  return (
    <span ref={ref} className={className}>
      {formatter.format(displayValue)}
      {suffix}
    </span>
  );
}
