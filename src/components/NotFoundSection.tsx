export const NotFoundSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Page </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              Not Found
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl opacity-0 animate-fade-in-delay-3">
            Sorry, the page you are looking for does not exist or has been moved
          </p>
          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="/" className="cosmic-button">
              Return to homepage
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
