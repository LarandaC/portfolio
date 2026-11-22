import { useTranslation } from "react-i18next";
import { credits } from "@/data/credits";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/common/Button";

/** "Credits" link that opens the list of 3D models and their authors (CC BY requires it). */
export function CreditsDialog({ variant = "link" }: { variant?: "link" | "chip" }) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>{t("credits.button")}</Button>
      </DialogTrigger>
      <DialogContent
        // Lets the list scroll natively instead of Lenis capturing the wheel (classic page).
        data-lenis-prevent
        className="flex max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl flex-col gap-4 overflow-y-auto rounded-[26px] border-line bg-surface p-7 sm:rounded-[26px]"
      >
        <DialogTitle className="text-2xl font-medium tracking-[-.03em] text-ink">{t("credits.title")}</DialogTitle>
        <DialogDescription className="text-sm leading-normal text-body">{t("credits.intro")}</DialogDescription>
        <ul className="flex flex-col divide-y divide-line">
          {credits.map((credit) => (
            <li key={credit.url} className="flex flex-col gap-0.5 py-3 text-sm">
              <span className="text-xs font-semibold tracking-wide text-brand uppercase">
                {t(`credits.roles.${credit.roleKey}`)}
              </span>
              <span className="text-ink">
                <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-medium underline">
                  "{credit.title}"
                </a>{" "}
                {t("credits.by")} {credit.author}
              </span>
              <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-ink underline">
                {credit.license}
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
