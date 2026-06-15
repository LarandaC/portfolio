import { useMemo, useState } from "react";
import { Home, User, Briefcase, Code2, FolderKanban, Mail } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTranslation } from "react-i18next";
import { SideNavItem } from "./SideNavItem";
import { SideNavFooter } from "./SideNavFooter";
import { SideNavMobile } from "./SideNavMobile";

const NAV_ICONS = {
  home: Home,
  about: User,
  experience: Briefcase,
  skills: Code2,
  projects: FolderKanban,
  contact: Mail,
};

const SECTION_IDS = navItems.map((i) => i.href.replace("#", ""));

export function SideNav() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  const activeIndex = useMemo(() => {
    const idx = navItems.findIndex((i) => i.href.replace("#", "") === activeSection);
    return idx === -1 ? 0 : idx;
  }, [activeSection]);

  return (
    <>
      <div className="side-nav-wrapper hidden md:flex">
        <aside className="side-nav">
          <div className="side-nav-list">
            {navItems.map((item, index) => (
              <SideNavItem
                key={item.id}
                href={item.href}
                icon={NAV_ICONS[item.id as keyof typeof NAV_ICONS]}
                label={t(item.labelKey)}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </aside>

        <SideNavFooter />
      </div>

      <SideNavMobile isOpen={mobileOpen} setIsOpen={setMobileOpen} />
    </>
  );
}
