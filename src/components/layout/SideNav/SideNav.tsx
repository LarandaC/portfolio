import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Home, User, Code2, FolderKanban, Mail } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTranslation } from "react-i18next";
import { SideNavItem } from "./SideNavItem";
import { SideNavFooter } from "./SideNavFooter";
import { SideNavMobile } from "./SideNavMobile";

const NAV_ICONS = {
  home: Home,
  about: User,
  skills: Code2,
  projects: FolderKanban,
  contact: Mail,
};

const ITEM_H = 48;
const OVAL_H = 256;
const CENTER_OFFSET = OVAL_H / 2 - ITEM_H / 2; // 104px
const N = navItems.length;
// Render 3 copies so the list wraps in both directions.
// The active item always lives in the middle copy (offset = N).
const VIRTUAL_ITEMS = [...navItems, ...navItems, ...navItems];

export function SideNav() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => navItems.map((i) => i.href.replace("#", "")), []);
  const activeSection = useScrollSpy(sectionIds);

  const activeIndex = useMemo(() => {
    const idx = navItems.findIndex((i) => i.href.replace("#", "") === activeSection);
    return idx === -1 ? 0 : idx;
  }, [activeSection]);

  // Pin the active item to the middle copy so neighbours wrap in both directions
  const virtualActive = N + activeIndex;
  const translateY = CENTER_OFFSET - virtualActive * ITEM_H;

  return (
    <>
      <div className="side-nav-wrapper hidden md:flex">
        <aside className="side-nav">
          <div className="side-nav-slot" aria-hidden />

          <div
            className="side-nav-list"
            style={{ "--nav-ty": `${translateY}px` } as CSSProperties}
          >
            {VIRTUAL_ITEMS.map((item, vi) => (
              <SideNavItem
                key={vi}
                href={item.href}
                icon={NAV_ICONS[item.id as keyof typeof NAV_ICONS]}
                label={t(item.labelKey)}
                isActive={vi === virtualActive}
                distance={Math.abs(vi - virtualActive)}
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
