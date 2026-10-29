export type ExperienceType = "work" | "education" | "freelance";

export interface ExperienceEntry {
  id: string;
  type: ExperienceType;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export const experiences: ExperienceEntry[] = [
  {
    id: "clt",
    type: "work",
    role: "Desarrolladora Frontend",
    organization: "CLT S.A",
    period: "Ene 2026 – Actualidad",
    description:
      "Interfaces responsivas con React, Tailwind y Shadcn, transformando mockups de diseño en productos funcionales. Integración de APIs RESTful, gestión de estado con Zustand, componentes UI reutilizables, revisiones de código y trabajo estrecho con backend para definir contratos de integración.",
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
