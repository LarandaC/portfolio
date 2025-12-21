import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import type { FunctionComponent } from "react";

interface ArrowProps {
  onClick?: () => void;
}

export const NextArrow: FunctionComponent<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden sm:flex absolute top-1/2 right-[-32px] -translate-y-1/2 z-10  text-primary p-2 rounded-full hover:text-secondary-foreground transition cursor-pointer"
  >
    <ChevronRight />
  </button>
);

export const PrevArrow: FunctionComponent<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden sm:flex absolute top-1/2 left-[-32px] -translate-y-1/2 z-10  text-primary p-2 rounded-full hover:text-secondary-foreground transition cursor-pointer"
  >
    <ChevronLeft />
  </button>
);
