import { Menu } from "lucide-react";
import { NavBarMobile } from "../NavBar/NavBarMobile";

interface SideNavMobileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function SideNavMobile({ isOpen, setIsOpen }: SideNavMobileProps) {
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="side-nav-mobile-btn flex md:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={18} />
      </button>
      <NavBarMobile isMenuOpen={isOpen} setIsMenuOpen={setIsOpen} />
    </>
  );
}
