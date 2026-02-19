import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("Home");

  const categories = [
    { id: 1, name: "B", desc: t("catB") },
    { id: 2, name: "A", desc: t("catA") },
    { id: 3, name: "C", desc: t("catC") },
    { id: 4, name: "D", desc: t("catD") },
    { id: 5, name: "BE", desc: t("catBE") },
    { id: 6, name: "T/S", desc: t("catTS") },
  ];

  const features = [
    { title: t("feat1Title"), text: t("feat1Text") },
    { title: t("feat2Title"), text: t("feat2Text") },
    { title: t("feat3Title"), text: t("feat3Text") },
    { title: t("feat4Title"), text: t("feat4Text") },
  ];

  const steps = [
    { n: "01", title: t("step1Title"), text: t("step1Text") },
    { n: "02", title: t("step2Title"), text: t("step2Text") },
    { n: "03", title: t("step3Title"), text: t("step3Text") },
  ];

  const stats = [
    { k: "32", v: t("statSubjects") },
    { k: "1600+", v: t("statQuestions") },
    { k: "3", v: t("statModes") },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {t("badge")}
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {t("heroTitle")}{" "}
              <span className="text-slate-500">{t("heroTitleHighlight")}</span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {t("heroDescription")}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tickets/1"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white hover:bg-slate-800"
              >
                {t("startTickets")}
              </Link>
              <Link
                href="/subjectpicker"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium hover:bg-slate-50"
              >
                {t("chooseSubjects")}
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
                >
                  <div className="text-2xl font-semibold">{s.k}</div>
                  <div className="mt-1 text-xs text-slate-500">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero mock card */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{t("mockQuickTest")}</div>
                    <div className="text-xs text-slate-500">
                      {t("mockRandom30")}
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                    live
                  </span>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-200">
                  <div className="text-xs text-slate-500">{t("mockQuestionNum")}</div>
                  <div className="mt-2 text-sm font-medium leading-relaxed">
                    {t("mockQuestionText")}
                  </div>

                  <div className="mt-4 grid gap-2">
                    {["A", "B", "C", "D"].map((k) => (
                      <div
                        key={k}
                        className="h-11 rounded-xl border border-slate-200 bg-white px-3 flex items-center text-sm text-slate-700"
                      >
                        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold">
                          {k}
                        </span>
                        {t("mockAnswer")}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{t("mockRemaining")}</span>
                    <span>{t("mockTime")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold">{t("mockSubjects")}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      t("mockTagSigns"),
                      t("mockTagFirstAid"),
                      t("mockTagPriority"),
                      t("mockTagSpeed"),
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold">{t("mockProgress")}</div>
                  <div className="mt-2">
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[62%] rounded-full bg-slate-900" />
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      {t("mockProgressText")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-slate-100 to-slate-50 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              {t("featuresTitle")}
            </h2>
            <p className="mt-2 text-slate-600">
              {t("featuresSubtitle")}
            </p>
          </div>
          <Link
            href="/exam"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
          >
            {t("startTest")}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-semibold">
                  ✓
                </span>
                <div>
                  <div className="text-lg font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    {f.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                {t("howTitle")}
              </h2>
              <p className="mt-2 text-slate-600">
                {t("howSubtitle")}
              </p>

              <div className="mt-6 grid gap-4">
                {steps.map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700">
                      {s.n}
                    </div>
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-sm text-slate-600">{s.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subjectpicker"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white hover:bg-slate-800"
                >
                  {t("chooseSubjectsBtn")}
                </Link>
                <Link
                  href="/tickets/1"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium hover:bg-slate-50"
                >
                  {t("ticketsB")}
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
              <div className="text-sm font-semibold">{t("recommendation")}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {t("recommendationText")}
              </p>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-white border border-slate-200 p-4">
                  <div className="text-xs text-slate-500">{t("dailyPlan")}</div>
                  <div className="mt-1 font-semibold">
                    {t("dailyPlanText")}
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 p-4">
                  <div className="text-xs text-slate-500">{t("focus")}</div>
                  <div className="mt-1 font-semibold">
                    {t("focusText")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-6xl px-4 pt-14 md:pt-20"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">{t("categoriesTitle")}</h2>
            <p className="mt-2 text-slate-600">
              {t("categoriesSubtitle")}
            </p>
          </div>
          <div className="hidden md:block text-sm text-slate-500">
            {t("tip")}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/tickets/${c.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:bg-slate-50 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-semibold">{c.name}</div>
                  <div className="mt-1 text-sm text-slate-600">{c.desc}</div>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white group-hover:bg-slate-800">
                  →
                </span>
              </div>
              <div className="mt-5 text-xs text-slate-500">
                {t("openTickets")}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pt-14 md:pt-20 pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl font-semibold md:text-3xl">{t("faqTitle")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FaqItem q={t("faq1Q")} a={t("faq1A")} />
            <FaqItem q={t("faq2Q")} a={t("faq2A")} />
            <FaqItem q={t("faq3Q")} a={t("faq3A")} />
            <FaqItem q={t("faq4Q")} a={t("faq4A")} />
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-slate-50 p-6 border border-slate-200 md:flex-row md:items-center">
            <div>
              <div className="text-lg font-semibold">{t("ctaTitle")}</div>
              <div className="mt-1 text-sm text-slate-600">
                {t("ctaText")}
              </div>
            </div>
            <div className="flex w-full gap-3 sm:w-auto">
              <Link
                href="/tickets/1"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white hover:bg-slate-800 sm:flex-none"
              >
                {t("ticketsB")}
              </Link>
              <Link
                href="/exam"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium hover:bg-slate-50 sm:flex-none"
              >
                {t.raw("feat3Title")}
              </Link>
            </div>
          </div>
        </div>

        <footer className="mx-auto max-w-6xl px-4 pt-10 text-sm text-slate-500">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
                P
              </span>
              <span>© {new Date().getFullYear()} Prava.ge</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link className="hover:text-slate-700" href="/contact">
                {t("footerContact")}
              </Link>
              <Link className="hover:text-slate-700" href="/privacy">
                {t("footerPrivacy")}
              </Link>
              <Link className="hover:text-slate-700" href="/terms">
                {t("footerTerms")}
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="font-semibold">{q}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{a}</div>
    </div>
  );
}
