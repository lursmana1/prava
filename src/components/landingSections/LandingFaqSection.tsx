import { getTranslations } from "next-intl/server";
import LandingFaq from "./LandingFaq";
import landingFaq from "@/data/landingFaq.json";

export default async function LandingFaqSection() {
  const t = await getTranslations("Home");

  const items = landingFaq.map((item, i) => ({
    key: String(i + 1),
    label: t(`${item.key}Q`),
    children: t(`${item.key}A`),
  }));

  return (
    <section
      id="faq"
      className="section p-8 bg-slate-50/80"
      aria-labelledby="faq-title"
    >
      <h2
        id="faq-title"
        className="text-center text-2xl font-bold text-slate-900 md:text-3xl"
      >
        {t("faqSectionTitle")}
      </h2>
      <div className="mx-auto mt-10 max-w-2xl">
        <LandingFaq items={items} />
      </div>
    </section>
  );
}
