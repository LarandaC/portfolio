import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const LoaderSection = () => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tilts iniciales — cada anillo vive en un plano distinto
      gsap.set(ring2Ref.current, { rotationX: 62 });
      gsap.set(ring3Ref.current, { rotationX: -55, rotationZ: 35 });

      // Spin continuo en Y a distintas velocidades
      gsap.to(ring1Ref.current, {
        rotationY: "+=360",
        duration: 2.6,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring2Ref.current, {
        rotationY: "+=360",
        duration: 3.5,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring3Ref.current, {
        rotationY: "-=360",
        duration: 4.3,
        repeat: -1,
        ease: "none",
      });

      // Fade-in del texto después de que el giroscopio aparece
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: "power3.out" }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Glow de fondo */}
      <div className="absolute w-[480px] h-[480px] rounded-full bg-primary/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-secondary-foreground/8 blur-[80px] bottom-1/4 right-1/4 pointer-events-none" />

      <div ref={wrapRef} className="flex flex-col items-center gap-12 z-10">

        {/* Giroscopio 3D */}
        <div
          className="relative w-40 h-40"
          style={{ perspective: "560px" }}
        >
          {/* Halo interior pulsante */}
          <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/15 blur-xl animate-pulse pointer-events-none" />

          {/* Esfera central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary-foreground z-20 shadow-[0_0_22px_hsl(var(--primary)/0.85)]" />

          {/* Anillo 1 — plano horizontal */}
          <div
            ref={ring1Ref}
            className="absolute inset-0 rounded-full border-[1.5px] border-primary"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/1)]" />
          </div>

          {/* Anillo 2 — plano vertical inclinado */}
          <div
            ref={ring2Ref}
            className="absolute inset-0 rounded-full border-[1.5px] border-secondary-foreground/55"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-secondary-foreground/80 shadow-[0_0_12px_hsl(var(--secondary-foreground)/0.7)]" />
          </div>

          {/* Anillo 3 — plano diagonal, un poco más pequeño */}
          <div
            ref={ring3Ref}
            className="absolute inset-[14px] rounded-full border-[1.5px] border-primary/45"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/65 shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
          </div>
        </div>

        {/* Nombre y rol */}
        <div ref={textRef} className="text-center space-y-2 opacity-0">
          <h1 className="text-2xl font-bold font-family-title bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent tracking-tight">
            Leticia Aranda
          </h1>
          <p className="text-xs text-muted-foreground tracking-[0.25em] uppercase">
            Developer
          </p>
        </div>

      </div>
    </section>
  );
};
