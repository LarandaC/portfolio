import { Github, Linkedin, Mail } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="relative py-28 px-4 bg-card">
      <div className="max-w-3xl mx-auto text-center">
        {/* Encabezado */}
        <div className="mb-10 justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            ¿Listo para trabajar juntos?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-4" />
        </div>

        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Estoy siempre abierta a discutir nuevos proyectos, ideas creativas u
          oportunidades para formar parte de tu visión.
        </p>

        {/* Botones de Contacto */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* GitHub Button */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Github className="text-primary" size={20} />
            <span className="font-medium">GitHub</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Linkedin className="text-primary" size={20} />
            <span className="font-medium">LinkedIn</span>
          </a>

          {/* Mail Button */}
          <a
            href="mailto:leticia.m.aranda@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-secondary-foreground text-primary-foreground rounded-xl shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Mail size={20} />
            <span className="font-semibold">leticia.m.aranda@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
