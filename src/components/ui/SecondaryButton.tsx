interface SecondaryButtonProps {
  text: string;
  href: string;
}

export const SecondaryButton = ({ text, href }: SecondaryButtonProps) => {
  const isPdf = href.endsWith(".pdf");
  const Tag = "a";

  return (
    <div className="flex flex-col sm:flex-row gap-2 pt-0 sm:pt-4 justify-center">
      <Tag
        href={href}
        target={isPdf ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="
          px-16 py-3 rounded-full font-semibold text-base
          border border-primary text-primary
          transition-all duration-300 ease-in-out
          hover:bg-primary/10 hover:border-primary/70
          hover:-translate-y-0.5 hover:shadow-lg
          active:scale-95
        "
      >
        {text}
      </Tag>
    </div>
  );
};
