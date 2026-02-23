type LandingFaqProps = {
  items: { key: string; label: string; children: string }[];
};

export default function LandingFaq({ items }: LandingFaqProps) {
  return (
    <div className="landing-faq">
      {items.map((item) => (
        <details key={item.key} className="landing-faq__item group border-b border-slate-200 last:border-b-0">
          <summary className="landing-faq__summary flex cursor-pointer list-none items-center justify-between py-4 font-medium text-slate-900 transition-colors hover:text-blue-600 [&::-webkit-details-marker]:hidden">
            {item.label}
            <span className="text-slate-400 transition-transform duration-200 ease-out group-open:rotate-180">▼</span>
          </summary>
          <div className="landing-faq__content overflow-hidden pb-4">
            <p className="text-slate-600">{item.children}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
