export type ExperienceType = "work" | "education" | "freelance";

export interface ExperienceEntry {
  id: string;
  type: ExperienceType;
  role: string;
  organization: string;
  period: string;
  description: string;
  /** Bullet points under the description. */
  highlights?: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: "clt",
    type: "work",
    role: "Desarrolladora Frontend",
    organization: "CLT S.A",
    period: "Ene 2026 – Actualidad",
    description:
      "Desarrollo de aplicaciones web modulares y escalables con React, Next.js, Tailwind y Shadcn, transformando diseños en productos funcionales y trabajando de cerca con backend para definir contratos de integración.",
    highlights: [
      "Centro de notificaciones en tiempo real con SignalR.",
      "Migración de Next.js 12 a Next.js 16.",
      "Optimizaciones de rendimiento y tiempos de carga.",
      "Mejoras estéticas y de experiencia de usuario en las interfaces.",
      "Integración de APIs RESTful y gestión de estado con Zustand.",
      "Componentes UI reutilizables y revisiones de código.",
    ],
  },
  {
    id: "guadalupe",
    type: "freelance",
    role: "Desarrolladora",
    organization: "Recicladora Guadalupe",
    period: "2026",
    description:
      "Sistema de gestión de recursos humanos a medida: módulos de alta y baja de empleados, control de asistencia, liquidación de sueldos y panel de reportes. Frontend desarrollado en Next.js con integración a Supabase.",
  },
  {
    id: "automovil",
    type: "work",
    role: "Soporte y Monitoreo - HelpDesk",
    organization: "Automóvil Supply S.A",
    period: "Sep 2024 – Ene 2026",
    description:
      "Monitoreo de sistemas, redes y enlaces para asegurar su disponibilidad. Resolución de incidencias en Linux y Windows, reduciendo los tiempos de inactividad en un 10%, y gestión de tickets y documentación de soporte.",
  },
  {
    id: "uaa",
    type: "education",
    role: "Ingeniería en Informática",
    organization: "Universidad Autónoma de Asunción",
    period: "2019 – Actualidad",
    description:
      "Énfasis en sistemas informáticos. Actualmente en proceso de trabajo de grado.",
  },
  {
    id: "fullstack",
    type: "education",
    role: "Curso de Desarrollo Web Full Stack",
    organization: "Instituto de Diseño y Tecnología - IDT",
    period: "Mar 2025 – Mar 2026",
    description:
      "Aplicaciones web fullstack con React y Express.js, interfaces responsivas y accesibles con TailwindCSS y Shadcn UI, y creación y consumo de servicios RESTful.",
  },
];

/** Jobs and freelance work, and studies: the two timelines (classic page and map panel). */
export const workExperiences = experiences.filter((e) => e.type === "work" || e.type === "freelance");
export const educationExperiences = experiences.filter((e) => e.type === "education");
