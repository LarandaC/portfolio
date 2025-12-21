import Slider from "react-slick";
import { ProjectCard } from "../cards/ProjectCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./Arrows";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    customPaging: (_: number) => (
      <div className="w-2 h-2 mt-8 rounded-full bg-gray-300 hover:bg-primary transition-all" />
    ),
  };

  return (
    <div className="project-carousel relative">
      <Slider {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
        {projects.map((project) => (
          <div key={project.id} className="px-4">
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.demoUrl}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
