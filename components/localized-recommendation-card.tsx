import type { LocalizedDiseaseInfo } from "@/lib/localization/disease-info";

function Group({ title, items }: { title: string; items: readonly string[] }) {
  if (!items.length) return null;
  return <div className="mt-4"><h3 className="text-sm font-semibold text-emerald-900">{title}</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-stone-700">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export function LocalizedRecommendationCard({ info }: { info: LocalizedDiseaseInfo }) {
  return <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm" aria-label="Inama z'ubuhinzi"><p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Icyo wakora</p><p className="mt-2 text-sm leading-6 text-stone-700">{info.explanation}</p><Group title="Ibyo wareba" items={info.symptoms} /><Group title="Ibyo wakora" items={info.actions} /><Group title="Uko wayirinda" items={info.prevention} /><div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-950"><p className="font-semibold">Icyitonderwa</p><p className="mt-1">{info.warning}</p></div><p className="mt-4 border-t border-stone-100 pt-3 text-sm leading-6 text-stone-600">{info.assistance}</p></section>;
}
