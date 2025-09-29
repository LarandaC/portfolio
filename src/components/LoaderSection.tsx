export const LoaderSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          {/* Spinner */}
          <div className="animate-spin inline-block w-16 h-16 border-4 border-t-primary border-b-primary rounded-full"></div>
          <p className="mt-4 text-lg font-medium animate-pulse">Cargando...</p>
        </div>
      </div>
    </section>
  );
};
