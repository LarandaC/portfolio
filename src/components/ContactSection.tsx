import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import type React from "react";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias, me pondré en contacto contigo pronto.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Ponte en <span className="text-primary">contacto</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          ¿Quieres colaborar o simplemente saludar?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-10 bg-card p-8 rounded-xl shadow-lg ">
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
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
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
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
          <div
            className="space-y-10 bg-card p-8 rounded-xl shadow-lg"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold mb-6">Envía un mensaje</h3>
            <form action="" className="space-y-6">
              <div>
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
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out"
                  placeholder="John Doe"
                />
              </div>
              <div>
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
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out"
                  placeholder="JohnDoe@gmail.com"
                />
              </div>
              <div>
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
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out resize-none"
                  placeholder="Aquí tu mensaje"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2",
                  ""
                )}
              >
                {isSubmitting ? "Enviando..." : "Mensaje enviado"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
