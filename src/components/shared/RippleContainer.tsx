// 📦 src/components/ui/RippleContainer.tsx

import { motion } from "framer-motion";
import { useState, type HTMLAttributes, type ReactNode } from "react";

interface RippleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

interface RippleState {
  id: number;
  x: number;
  y: number;
  size: number;
}

const calculateRippleSize = (target: HTMLElement) => {
  const { width, height } = target.getBoundingClientRect();
  return Math.max(width, height) * 2;
};

export const RippleContainer = ({
  children,
  className,
  ...restProps
}: RippleProps) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  const handleCreateRipple = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const { top, left } = target.getBoundingClientRect();

    const x = event.clientX - left;
    const y = event.clientY - top;
    const size = calculateRippleSize(target);

    const newRipple: RippleState = { id: Date.now(), x, y, size };
    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  const handleRippleComplete = (id: number) => {
    setRipples((prevRipples) =>
      prevRipples.filter((ripple) => ripple.id !== id)
    );
  };

  return (
    <div
      className={`relative overflow-hidden rounded-full ${className || ""}`}
      onClick={handleCreateRipple}
      {...restProps}
    >
      {/* motion.a o motion.button */}
      {children}

      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        {ripples.map(({ id, x, y, size }) => (
          <motion.span
            key={id}
            className="absolute rounded-full bg-white/50"
            style={{
              width: size,
              height: size,
              top: y,
              left: x,
              marginLeft: -size / 2,
              marginTop: -size / 2,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => handleRippleComplete(id)}
          />
        ))}
      </div>
    </div>
  );
};
