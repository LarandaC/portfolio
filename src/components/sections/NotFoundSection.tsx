import { Button } from "../ui/Button";
import { TitleGradient } from "../ui/TitleGradient";

export const NotFoundSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center space-y-8 opacity-0 animate-fade-in">
        <div className="relative mb-4">
          <h1 className="text-[10rem] md:text-[14rem] font-black text-primary select-none leading-none ">
            <TitleGradient text="404" />
          </h1>
        </div>

        {/* Título y descripción */}
        <div className="space-y-6 opacity-0 animate-fade-in-delay-1">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Houston, tenemos un problema
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            La página que buscas se perdió en el espacio profundo. Tal vez fue
            abducida por alienígenas o simplemente no existe en este universo.
          </p>
        </div>

        {/* Botón de retorno */}
        <div className="opacity-0 animate-fade-in-delay-3 pt-4">
          <Button href="/" text="Volver a casa" />
        </div>

        {/* Información adicional */}
        <div className="opacity-0 animate-fade-in-delay-4 pt-8">
          <p className="text-sm text-foreground/50">
            Error Code:{" "}
            <span className="font-mono text-primary">PAGE_NOT_FOUND</span>
          </p>
        </div>
      </div>
    </section>
  );
};
