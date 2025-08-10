import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-5 px-4 sm:px-8 md:px-14 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center gap-4">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MidasTech.co. All rights reserved.
      </p>
      <a
        href="#hero"
        onClick={scrollToTop}
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={22} />
      </a>
    </footer>
  );
};
