import { type ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = [
    "hsl(280 70% 60%)",
    "hsl(260 75% 65%)",
    "hsl(270 65% 55%)",
    "hsl(290 70% 62%)",
    "hsl(280 70% 60%)",
  ],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    animationDuration: `${animationSpeed}s`,
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
  };

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-[1.25rem] backdrop-blur transition-shadow duration-500 overflow-hidden ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary-foreground z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-background rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text animate-gradient"
        style={{
          ...gradientStyle,
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </span>
  );
}
