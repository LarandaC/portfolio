import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 px-4 sm:px-8 md:px-28 border-t border-border bg-card flex flex-wrap sm:justify-between items-center gap-2 relative justify-center">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Leticia. Todos los derechos
        reservados.
      </p>

      <button
        onClick={scrollToTop}
        aria-label="Volver arriba"
        className="bg-primary/10 text-primary p-2 rounded-full transition-all hover:bg-primary/20 cursor-pointer"
      >
        <ArrowUp size={22} />
      </button>
    </footer>
  );
};
