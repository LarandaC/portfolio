import { useTranslation } from "react-i18next";

export const NotFoundSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      <span aria-hidden className="not-found-ghost font-family-display font-bold">
        404
      </span>
      <div aria-hidden className="not-found-glow" />

      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center gap-7">
        <p className="font-mono text-xs tracking-[0.32em] uppercase text-accent/60">
          ERR · 404
        </p>

        <h1 className="not-found-title font-family-display font-bold">
          {t("404.title")}
        </h1>

        <p className="text-base leading-relaxed text-muted-foreground max-w-md">
          {t("404.description")}
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center font-mono text-xs tracking-[0.2em] uppercase px-8 py-3 mt-2 about-contact-btn"
        >
          {t("404.button")}
        </a>

        <p className="font-mono text-xs text-muted-foreground/35 tracking-[0.08em] mt-4">
          Error Code: <span className="text-primary/50">PAGE_NOT_FOUND</span>
        </p>
      </div>
    </section>
  );
};
