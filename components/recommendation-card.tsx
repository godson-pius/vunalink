import type { Recommendation } from "@/lib/recommendations/types";

function Group({ title, items }: { title: string; items: readonly string[] }) {
  if (!items.length) return null;
  return <div className="mt-4"><h3 className="text-sm font-semibold text-emerald-900">{title}</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-stone-700">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm" aria-label="Agricultural guidance"><p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">What you can do</p><p className="mt-2 text-sm leading-6 text-stone-700">{recommendation.explanation}</p><Group title="What to look for" items={recommendation.symptoms} /><Group title="Recommended actions" items={recommendation.actions} /><Group title="Prevention" items={recommendation.prevention} /><div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-950"><p className="font-semibold">Important</p>{recommendation.warnings.map((warning) => <p key={warning} className="mt-1">{warning}</p>)}</div><p className="mt-4 border-t border-stone-100 pt-3 text-sm leading-6 text-stone-600">{recommendation.assistanceNote}</p></section>;
}
