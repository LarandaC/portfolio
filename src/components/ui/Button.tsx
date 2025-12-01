import { motion } from "framer-motion";
import { RippleContainer } from "../shared/RippleContainer";

interface ButtonProps {
  text: string;
  href?: string;
  type?: "submit" | "button" | "reset";
  isSubmitting?: boolean;
}

export const Button = ({
  text,
  href,
  isSubmitting = false,
  type = "submit",
}: ButtonProps) => {
  const Component = href ? motion.a : motion.button;
  const isButton = !href;

  const buttonClasses = `
    cosmic-button cursor-pointer
    ${isButton ? "flex items-center justify-center gap-2" : ""}
    ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
  `;
  // si es a o href
  const specificProps = isButton
    ? { type: type, disabled: isSubmitting }
    : { href};

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
      <RippleContainer className={buttonClasses}>
        <Component
          whileHover={{ boxShadow: "0 0 15px rgba(87, 57, 156, 0.9)" }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
            boxShadow: { duration: 0.3 },
          }}
          {...specificProps}
        >
          <span className="relative z-10 cursor-pointer">
            {isButton && isSubmitting ? "Enviando..." : text}
          </span>
        </Component>
      </RippleContainer>
    </div>
  );
};
