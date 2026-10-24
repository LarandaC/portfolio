import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navItems } from "@/lib/navigation";
import { socialLinks } from "@/data/social";
import { FooterLogo } from "./FooterLogo";

/** Single-row lime footer: logo + copyright, section links, socials. */
export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      id="footer"
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-6 bg-brand-soft px-[4vw] py-4 max-tablet:grid-cols-1 max-tablet:justify-items-center max-tablet:gap-y-3.5 max-tablet:py-6"
    >
      <div className="flex items-center gap-3 max-tablet:flex-col max-tablet:gap-2 max-tablet:text-center">
        <FooterLogo />
        <p className="text-[11px] leading-snug text-footer-text">
          &copy; {new Date().getFullYear()} · Leticia Aranda.
          <br />
          {t("footer.title")}
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-footer-link max-tablet:gap-x-[18px]">
        {navItems.slice(1).map((item) => (
          <a key={item.id} href={item.href} className="hover:underline">
            {t(item.labelKey)}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 justify-self-end text-deep-ink max-tablet:justify-self-center">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="transition-opacity duration-[250ms] hover:opacity-65"
          >
            <social.icon size={18} />
          </a>
        ))}
        <a
          href="#hero"
          aria-label={t("footer.scrollToTop")}
          title={t("footer.scrollToTop")}
          className="icon-btn size-8 bg-surface/40 text-deep-ink hover:bg-deep-ink hover:text-brand-soft"
        >
          <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
};
