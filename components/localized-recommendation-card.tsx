import type { LocalizedDiseaseInfo } from "@/lib/localization/disease-info";

function Group({ title, items }: { title: string; items: readonly string[] }) {
  if (!items.length) return null;
  return <div className="mt-4"><h3 className="text-sm font-semibold text-emerald-900">{title}</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-stone-700">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export function LocalizedRecommendationCard({ info, language = "rw" }: { info: LocalizedDiseaseInfo; language?: "rw" | "en" }) {
  const rw = language === "rw";
  return <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm" aria-label={rw ? "Inama z'ubuhinzi" : "Agricultural guidance"}><p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{rw ? "Icyo wakora" : "What to do"}</p><p className="mt-2 text-sm leading-6 text-stone-700">{info.explanation}</p><Group title={rw ? "Uko wabivura" : "Treatment guidance"} items={info.treatment} /><Group title={rw ? "Ibyo wareba" : "What to look for"} items={info.symptoms} /><Group title={rw ? "Ibyo wakora" : "Actions"} items={info.actions} /><Group title={rw ? "Uko wayirinda" : "Prevention"} items={info.prevention} /><div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-950"><p className="font-semibold">{rw ? "Icyitonderwa" : "Warning"}</p><p className="mt-1">{info.warning}</p></div><p className="mt-4 border-t border-stone-100 pt-3 text-sm leading-6 text-stone-600">{info.assistance}</p></section>;
}
