import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "../../lib/utils";
import { useToast } from "../../hooks/use-toast";
import type React from "react";
import { useRef, useState } from "react";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import emailjs from "@emailjs/browser";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const SERVICE_ID = "service_bp1he19";
  const TEMPLATE_ID = "template_2inu8li";
  const PUBLIC_KEY = "c38dNQVeBJ1g27dYK";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        toast({
          title: "Mensaje enviado 🎉",
          description: "Gracias, me pondré en contacto contigo pronto.",
        });
      }, 1500);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al enviar el mensaje ❌",
        description: "Por favor, intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <RevealOnScroll>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Ponte en <span className="text-primary">contacto</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            ¿Quieres colaborar o simplemente saludar?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-10 bg-card p-8 rounded-xl shadow-lg  border border-border/70">
              <h3 className="text-2xl font-semibold mb-8 ">
                Información de contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shadow-md">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Email:</h4>
                  <a
                    href="mailto:leticiaranda78@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 break-all"
                  >
                    leticia.m.aranda@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shadow-md">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Celular:</h4>
                  <a
                    href="tel:+595981473267"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    +595 981 473 267
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shadow-md">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>

                  <h4 className="font-medium">Dirección:</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Asunción, Paraguay
                  </a>
                </div>
              </div>
              <div className="pt-25">
                <div className="flex space-x-4 justify-center">
                  <a
                    href="https://www.linkedin.com/in/leticia-aranda-871575238/"
                    target="_blank"
                    className="hover:scale-110 transition-transform duration-300 "
                  >
                    <Linkedin />
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-10 bg-card p-8 rounded-xl shadow-lg  border border-border/70">
              <h3 className="text-2xl font-semibold mb-6">Envía un mensaje</h3>
              {/* Form start here */}
              <form
                ref={formRef}
                action=""
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out"
                    placeholder="John Doe"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out"
                    placeholder="JohnDoe@gmail.com"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    value={formData.message}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out resize-none"
                    placeholder="Aquí tu mensaje"
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "cosmic-button w-full flex items-center justify-center gap-2 cursor-pointer",
                    ""
                  )}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};