import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import landingSteps from "@/data/landingSteps.json";
import landingStats from "@/data/landingStats.json";
import landingLeaderboard from "@/data/landingLeaderboard.json";

const TROPHY_ICONS: Record<string, string> = {
  gold: "🥇",
  silver: "🥈",
  bronze: "🥉",
};

export default async function LandingHow() {
  const t = await getTranslations("Home");

  const steps = landingSteps.map((step) => ({
    n: step.n,
    title: t(step.titleKey),
    text: t(step.textKey),
    successStep: "successStep" in step && step.successStep,
  }));

  const stats = landingStats.map((stat) => ({
    key: t(stat.keyName),
    val: t(stat.valName),
    colorClass: stat.colorClass,
  }));

  return (
    <>
      {/* Section 1: How it works - full width, dark blue */}
      <section
        className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 px-6 py-16 md:px-8 md:py-20"
        aria-labelledby="how-title"
      >
        <div className="section">
          <h2 id="how-title" className="text-center text-2xl font-bold text-white md:text-3xl">
            {t("howTitle")}
          </h2>
          <p className="mt-2 text-center text-blue-100">{t("howSubtitle")}</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n} className="flex flex-col items-center text-center">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold ${
                    step.successStep ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
                  }`}
                  aria-hidden
                >
                  {step.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Left = Leaderboard, Right = Statistics + Testimonial */}
      <section className="bg-slate-50/80 px-6 py-16 md:px-8 md:py-20" aria-label="Leaderboard and stats">
        <div className="section">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Leaderboard */}
            <section
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md"
              aria-labelledby="leaderboard-heading"
            >
              <h3 id="leaderboard-heading" className="font-semibold text-slate-900">{t("leaderboardTitle")}</h3>
              <div className="mt-4 overflow-hidden rounded-lg">
                <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-600">
                  <span>{t("leaderboardColumnUser")}</span>
                  <span>{t("leaderboardColumnScore")}</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {landingLeaderboard.map((row) => (
                    <li
                      key={row.rank}
                      className="grid grid-cols-[1fr_auto] items-center gap-4 py-4 first:pt-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-700">
                          {row.initials}
                        </span>
                        <span className="flex items-center gap-2 text-slate-700">
                          {TROPHY_ICONS[row.trophy || "gold"]} {row.user}
                        </span>
                      </div>
                      <span className="font-medium text-slate-900">{row.xp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/leaderboard"
                className="mt-4 flex justify-center text-sm font-medium text-blue-600 hover:underline"
              >
                {t("leaderboardFull")}
              </Link>
            </section>

            {/* Right: Statistics + Testimonial */}
            <div className="flex flex-col gap-6">
              <section aria-label={t("statsSectionLabel")} className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.val}
                    className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-md"
                  >
                    <span className={`block text-2xl font-bold md:text-3xl ${stat.colorClass}`}>
                      {stat.key}
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">{stat.val}</span>
                  </div>
                ))}
              </section>
              <blockquote className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
                <span
                  className="absolute -left-2 -top-2 text-8xl font-serif text-blue-200/60"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="relative text-slate-700 leading-relaxed">&ldquo;{t("testimonial")}&rdquo;</p>
                <footer className="relative mt-5 flex items-center gap-3">
                  <span className="h-11 w-11 rounded-full bg-slate-300" aria-hidden />
                  <cite className="not-italic">
                    <span className="block font-medium text-slate-900">{t("testimonialAuthor")}</span>
                    <span className="text-sm text-slate-500">{t("testimonialRole")}</span>
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
