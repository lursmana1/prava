import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function LandingHero() {
  const t = await getTranslations("Home");

  return (
    <section className="section py-16 md:py-24 lg:py-28 font-georgian" aria-labelledby="hero-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            ★ {t("heroBadge")}
          </p>
          <h1 id="hero-title" className="mt-6 text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">{t("heroDescription")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/exam"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              {t("heroCta1")}
            </Link>
            <Link
              href="/subjectpicker"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              {t("heroCta2")}
            </Link>
          </div>
          <ul className="mt-10 space-y-3">
            {[t("heroBullet1"), t("heroBullet2"), t("heroBullet3")].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm font-bold" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8" aria-label="Quiz preview">
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">{t("mockQuestionProgress")}</span>
            <div className="text-right">
              <span className="block text-2xl font-bold text-blue-600">85%</span>
              <span className="text-xs text-slate-500">{t("mockProgress")}</span>
            </div>
          </div>
          <div className="mt-5 h-32 rounded-lg bg-slate-100 md:h-40" />
          <p className="mt-5 font-medium text-slate-900">{t("mockQuestion")}</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-xl border-2 border-blue-500 bg-blue-50/80 p-4">
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-blue-500 bg-white" aria-hidden />
              {t("mockAnswer1")}
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-slate-300" aria-hidden />
              {t("mockAnswer2")}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
