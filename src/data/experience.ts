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
      "Desarrollo y mantenimiento de interfaces web con Next.js y TypeScript. Diseño e implementación de componentes reutilizables en equipo ágil, optimización de rendimiento y colaboración estrecha con QA y backend para garantizar una experiencia de usuario de alta calidad.",
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
    organization: "Instituto Técnico Superior - IDT",
    period: "2025 – 2026",
    description:
      "Curso sobre el desarrollo web tanto frontend como backend y bases de datos.",
  },
];
