import saasImage from "../assets/projects/landing-page-saas.png";
import bankImage from "../assets/projects/landing-page-banco.png";
import restImage from "../assets/projects/react-route.png";
import simpsonsImage from "../assets/projects/the-simpsons-blog.png";

export const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "Un landing page usando React y Tailwind",
    image: saasImage,
    tags: ["React", "TailwindCSS", "TypeScript"],
    demoUrl: "",
    githubUrl: "https://github.com/LarandaC/landing-page",
  },
  {
    id: 2,
    title: "Bank Landing Page",
    description: "Landing page para un banco usando React y Tailwind",
    image: bankImage,
    tags: ["React", "TailwindCSS", "TypeScript"],
    demoUrl: "",
    githubUrl: "https://github.com/LarandaC/landing-page-bank",
  },
  {
    id: 3,
    title: "RESTEplorer",
    description: "Sitio web conectada a la API REST Countries",
    image: restImage,
    tags: ["React", "React-router", "TailwindCSS", "TypeScript"],
    demoUrl: "",
    githubUrl: "https://github.com/LarandaC/paises-react-route",
  },
  {
    id: 4,
    title: "The Simpsons Blog",
    description: "Blog de Los Simpsons usando The Simpsons API",
    image: simpsonsImage,
    tags: ["React", "React-router", "TailwindCSS", "TypeScript"],
    demoUrl: "https://larandac.github.io/the-simpson-blog/",
    githubUrl: "https://github.com/LarandaC/the-simpson-blog",
  },
];
