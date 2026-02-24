import { getTranslations } from "next-intl/server";
import landingFeatures from "@/data/landingFeatures.json";

export default async function LandingWhy() {
  const t = await getTranslations("Home");

  const features = landingFeatures.map((item) => ({
    title: t(`${item.key}Title`),
    text: t(`${item.key}Text`),
  }));

  return (
    <section
      className="section p-8 bg-slate-50/80"
      aria-labelledby="why-title"
    >
      <h2
        id="why-title"
        className="text-center text-2xl font-bold text-slate-900 md:text-3xl"
      >
        {t("whyTitle")}
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feat, i) => (
          <article
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 text-xl font-bold"
              aria-hidden
            >
              {i + 1}
            </div>
            <h3 className="font-semibold text-slate-900">{feat.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {feat.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
