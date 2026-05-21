import { useTranslation } from "react-i18next";
import { socialLinks } from "@/data/social";

export const ContactSection = () => {
  const { t } = useTranslation();

  const [github, linkedin, email] = socialLinks;

  return (
    <section id="contact" className="relative py-28 px-4 bg-card">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-10 justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground font-family-title">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-4" />
        </div>

        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("contact.description")}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <github.icon className="text-primary" size={20} />
            <span className="font-medium">GitHub</span>
          </a>

          <a
            href={linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <linkedin.icon className="text-primary" size={20} />
            <span className="font-medium">LinkedIn</span>
          </a>

          <a
            href={email.href}
            className="flex items-center gap-2 px-6 py-3 bg-secondary-foreground text-primary-foreground rounded-xl shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <email.icon size={20} />
            <span className="font-semibold">leticia.m.aranda@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
