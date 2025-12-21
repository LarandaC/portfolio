interface ButtonProps {
  text: string;
  href?: string;
  type?: "submit" | "button" | "reset";
}

export const Button = ({ text, href, type = "button" }: ButtonProps) => {
  const Tag = href ? "a" : "button";

  return (
    <div className="flex flex-col sm:flex-row gap-2 pt-4 justify-center">
      <Tag
        href={href}
        type={!href ? type : undefined}
        className="
          group relative overflow-hidden px-16 py-3 rounded-full
          font-semibold text-base text-primary-foreground
          cursor-pointer isolate
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-xl
        "
      >
        {/* Gradiente animado */}
        <span
          className="
            absolute inset-0 -z-10
            bg-gradient-to-r from-primary via-secondary-foreground to-primary
            bg-[length:200%_auto] bg-left
            transition-all duration-700 ease-in-out
            group-hover:bg-right
          "
        />

        <span
          className="
            absolute inset-0 bg-white/10 opacity-0
            group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
          "
        />

        {/* Texto */}
        <span className="relative flex items-center justify-center gap-2">
          {text}
        </span>
      </Tag>
    </div>
  );
};
