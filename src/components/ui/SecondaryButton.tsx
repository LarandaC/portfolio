import { motion } from "framer-motion";
import { useState } from "react";

interface buttonProps {
  text: string;
  href: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const SecondaryButton = ({ text, href }: buttonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const calculateRippleSize = (target: HTMLElement) => {
    const { width, height } = target.getBoundingClientRect();
    const size = Math.max(width, height) * 2;
    return size;
  };

  const handleCreateRipple = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const button = event.currentTarget;
    const { top, left } = button.getBoundingClientRect();

    const x = event.clientX - left;
    const y = event.clientY - top;

    const size = calculateRippleSize(button);

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  const handleRippleComplete = (id: number) => {
    setRipples((prevRipples) =>
      prevRipples.filter((ripple) => ripple.id !== id)
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
      <motion.a
        href={href}
        className="
          cosmic-button-secondary 
          relative cursor-pointer 
        "
        onClick={handleCreateRipple}
        whileHover={{
          boxShadow: "0 0 15px rgba(87, 57, 156, 0.9)",
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
          boxShadow: { duration: 0.3 },
        }}
      >
        <span className="relative z-10">{text}</span>

        <div className="absolute inset-0 overflow-hidden rounded-full">
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
      </motion.a>
    </div>
  );
};
