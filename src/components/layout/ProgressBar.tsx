import { motion, useScroll, useSpring } from "framer-motion";

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      style={{ scaleY }}
      className="
        fixed left-0 top-0 
        w-1.5 h-screen 
        
        bg-gradient-to-b from-secondary to-primary
        hidden md:block 
        origin-top 
        z-50
      "
    />
  );
};
