import saasImage from "../assets/projects/landing-page-saas.png";
import bankImage from "../assets/projects/landing-page-banco.png";
import restImage from "../assets/projects/react-route.png";
import simpsonsImage from "../assets/projects/the-simpsons-blog.png";

export interface Project {
  id: number;
  title: string;
  descriptionEn: string;
  descriptionEs: string;
  longDescriptionEn: string;
  longDescriptionEs: string;
  highlightsEn: string[];
  highlightsEs: string[];
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "SaaS Landing Page",
    descriptionEn: "Landing page with React and Tailwind",
    descriptionEs: "Una landing page con React y Tailwind",
    longDescriptionEn:
      "A fully responsive SaaS landing page built with React and Tailwind CSS. It features animated sections, a pricing table, testimonials, and a CTA area designed to maximize conversions. Special attention was paid to visual hierarchy and mobile-first layout.",
    longDescriptionEs:
      "Una landing page SaaS completamente responsive construida con React y Tailwind CSS. Incluye secciones animadas, tabla de precios, testimonios y un área de CTA diseñada para maximizar conversiones. Se prestó especial atención a la jerarquía visual y el diseño mobile-first.",
    highlightsEn: [
      "Mobile-first responsive layout with Tailwind CSS",
      "Smooth scroll animations with CSS transitions",
      "Reusable component architecture",
      "Optimized images and Lighthouse performance score",
    ],
    highlightsEs: [
      "Layout responsive mobile-first con Tailwind CSS",
      "Animaciones de scroll suaves con transiciones CSS",
      "Arquitectura de componentes reutilizables",
      "Imágenes optimizadas y buen puntaje en Lighthouse",
    ],
    image: saasImage,
    tags: ["React", "TailwindCSS", "TypeScript"],
    liveUrl: "",
    githubUrl: "https://github.com/LarandaC/landing-page",
  },
  {
    id: 2,
    title: "Bank Landing Page",
    descriptionEn: "Landing page for a bank with React and Tailwind",
    descriptionEs: "Landing page para un banco con React y Tailwind",
    longDescriptionEn:
      "A professional banking landing page that communicates trust and security. The design uses a clean color palette and structured layout to present financial products clearly. Built with accessibility and readability as core priorities.",
    longDescriptionEs:
      "Una landing page bancaria profesional que transmite confianza y seguridad. El diseño usa una paleta de colores limpia y un layout estructurado para presentar productos financieros de forma clara. Construida con accesibilidad y legibilidad como prioridades centrales.",
    highlightsEn: [
      "Professional financial design system",
      "Accessible color contrast ratios (WCAG AA)",
      "Structured sections: hero, features, plans, FAQ",
      "TypeScript for type-safe component props",
    ],
    highlightsEs: [
      "Sistema de diseño financiero profesional",
      "Relaciones de contraste de color accesibles (WCAG AA)",
      "Secciones estructuradas: hero, características, planes, FAQ",
      "TypeScript para props de componentes con tipado seguro",
    ],
    image: bankImage,
    tags: ["React", "TailwindCSS", "TypeScript"],
    liveUrl: "",
    githubUrl: "https://github.com/LarandaC/landing-page-bank",
  },
  {
    id: 3,
    title: "RESTExplorer",
    descriptionEn: "Website connected to the REST Countries API",
    descriptionEs: "Sitio web conectado a la API REST Countries",
    longDescriptionEn:
      "An interactive app that consumes the REST Countries API to display information about every country in the world. Users can search by name, filter by region, and navigate to a detail page for each country. Built with React Router for client-side navigation.",
    longDescriptionEs:
      "Una app interactiva que consume la API REST Countries para mostrar información sobre todos los países del mundo. Los usuarios pueden buscar por nombre, filtrar por región y navegar a una página de detalle de cada país. Construida con React Router para la navegación del lado del cliente.",
    highlightsEn: [
      "REST Countries API integration with async/await",
      "React Router for multi-page navigation",
      "Search and filter functionality with debouncing",
      "Dark/light mode support",
    ],
    highlightsEs: [
      "Integración con la API REST Countries con async/await",
      "React Router para navegación multi-página",
      "Funcionalidad de búsqueda y filtrado con debouncing",
      "Soporte de modo oscuro/claro",
    ],
    image: restImage,
    tags: ["React", "React Router", "TailwindCSS", "TypeScript"],
    liveUrl: "",
    githubUrl: "https://github.com/LarandaC/paises-react-route",
  },
  {
    id: 4,
    title: "The Simpsons Blog",
    descriptionEn: "Blog about The Simpsons with The Simpsons API",
    descriptionEs: "Blog sobre Los Simpsons con la API de The Simpsons",
    longDescriptionEn:
      "A fun blog-style app that fetches character and episode data from The Simpsons API. Users can browse characters, read quotes, and explore episodes organized by season. The project focuses on data fetching patterns and dynamic routing.",
    longDescriptionEs:
      "Una app estilo blog que obtiene datos de personajes y episodios de la API de Los Simpsons. Los usuarios pueden explorar personajes, leer frases y ver episodios organizados por temporada. El proyecto se centra en patrones de fetching de datos y rutas dinámicas.",
    highlightsEn: [
      "Dynamic routes with React Router for character detail pages",
      "Paginated API consumption",
      "Season and episode filter UI",
      "Deployed to GitHub Pages with custom base URL config",
    ],
    highlightsEs: [
      "Rutas dinámicas con React Router para páginas de detalle",
      "Consumo de API paginado",
      "UI de filtros por temporada y episodio",
      "Desplegado en GitHub Pages con configuración de base URL",
    ],
    image: simpsonsImage,
    tags: ["React", "React Router", "TailwindCSS", "TypeScript"],
    liveUrl: "https://larandac.github.io/the-simpson-blog/",
    githubUrl: "https://github.com/LarandaC/the-simpson-blog",
  },
];
