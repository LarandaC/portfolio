import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ContactHeading } from "./components/ContactHeading";
import { ContactSeparator } from "./components/ContactSeparator";
import { ContactLinks } from "./components/ContactLinks";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-36 px-6 overflow-hidden bg-background">
      <span aria-hidden className="absolute select-none pointer-events-none font-family-display font-bold leading-none contact-ghost-number">
        05
      </span>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px pointer-events-none section-top-border" />
      <div aria-hidden className="contact-ambient-glow" />

      <div className="max-w-5xl mx-auto relative z-[1] text-center">
        <RevealOnScroll>
          <ContactHeading />
          <ContactSeparator />
          <ContactLinks />
        </RevealOnScroll>
      </div>

      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px pointer-events-none contact-bottom-border" />
    </section>
  );
}

export default ContactSection;
