import { Button } from "../ui/Button";
import { Rocket } from "lucide-react";

export const NotFoundSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-8 flex flex-col items-center">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary/20 select-none animate-pulse-subtle">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket className="w-24 h-24 text-primary animate-float" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in">Página </span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1 text-glow">
                No Encontrada
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
              Parece que te has perdido en el espacio. La página que buscas no
              existe o ha sido movida a otra galaxia.
            </p>
          </div>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <Button href="/" text="Regresar a la Tierra" />
          </div>
        </div>
      </div>
    </section>
  );
};
