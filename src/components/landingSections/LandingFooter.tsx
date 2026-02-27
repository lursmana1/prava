import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function LandingFooter() {
  const t = await getTranslations("Home");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-16">
      <div className="section">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-10 w-10 rounded-lg bg-blue-600" aria-hidden />
              <span className="text-xl font-bold text-blue-600">prava.ge</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{t("footerBrand")}</p>
            {/* <div className="mt-4 flex gap-2" aria-label="Social links">
              <span className="h-8 w-8 rounded-full bg-slate-200" aria-hidden />
              <span className="h-8 w-8 rounded-full bg-slate-200" aria-hidden />
            </div> */}
          </div>

          <nav aria-label={t("footerPlatform")}>
            <h3 className="font-semibold text-slate-900">{t("footerPlatform")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="/exam" className="hover:text-slate-900">{t("footerSimulation")}</Link></li>
              <li><Link href="/subjectpicker" className="hover:text-slate-900">{t("footerTopics")}</Link></li>
              <li><Link href="#" className="hover:text-slate-900">{t("footerLeaderboard")}</Link></li>
              <li><Link href="#" className="hover:text-slate-900">{t("footerPrizes")}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t("footerResources")}>
            <h3 className="font-semibold text-slate-900">{t("footerResources")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="#faq" className="hover:text-slate-900">FAQ</Link></li>
              <li><Link href="#" className="hover:text-slate-900">{t("footerHelp")}</Link></li>
              <li><Link href="#" className="hover:text-slate-900">{t("footerTermsLink")}</Link></li>
              <li><Link href="#" className="hover:text-slate-900">{t("footerContact")}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">{t("footerCopyright", { year })}</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-700">{t("footerPrivacyLink")}</Link>
            <Link href="#" className="hover:text-slate-700">{t("footerCookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
