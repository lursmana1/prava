import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function LandingCta() {
  const t = await getTranslations("Home");

  return (
    <section className="bg-blue-600 py-16 md:py-20" aria-labelledby="cta-title">
      <div className="section text-center">
        <h2 id="cta-title" className="text-3xl font-bold text-white md:text-4xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">{t("ctaText")}</p>
        <Link
          href="/exam"
          className="mt-8 inline-flex h-14 items-center justify-center rounded-xl border-2 border-white bg-white px-8 font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          {t("ctaBtn")}
        </Link>
      </div>
    </section>
  );
}
