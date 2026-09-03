"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { clearDiagnoses, getDiagnoses } from "@/lib/history/storage";
import type { DiagnosisRecord } from "@/lib/history/types";

function formatDate(value: string) { return new Intl.DateTimeFormat("en-RW", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }

export default function HistoryPage() {
  const [records, setRecords] = useState<DiagnosisRecord[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => { void getDiagnoses().then(setRecords).catch(() => setError(true)).finally(() => setIsLoading(false)); }, []);
  const clearHistory = async () => { if (!window.confirm("Clear all saved crop checks from this device?")) return; await clearDiagnoses(); setRecords([]); setSelected(null); };
  return <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-28 pt-8 sm:px-8"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">History</p><div className="mt-3 flex items-start justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight text-stone-950">Your crop checks</h1><p className="mt-3 leading-7 text-stone-600">Saved on this device and available offline.</p></div>{records.length > 0 && <button type="button" onClick={() => void clearHistory()} className="mt-1 shrink-0 text-sm font-semibold text-red-700">Clear all</button>}</div>{isLoading ? <p className="mt-10 text-center text-sm text-stone-500">Loading saved checks…</p> : error ? <p role="alert" className="mt-10 rounded-2xl bg-red-50 p-4 text-sm text-red-800">Saved history is not available on this device.</p> : records.length === 0 ? <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center"><p className="font-semibold text-stone-900">No crop checks yet</p><p className="mt-2 text-sm leading-6 text-stone-600">Your local diagnoses will appear here after you analyze a crop.</p></div> : <div className="mt-8 space-y-3">{records.map((record) => <button type="button" key={record.id} onClick={() => setSelected(selected === record.id ? null : record.id)} className="w-full rounded-2xl border border-stone-200 bg-white p-4 text-left shadow-sm"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold text-stone-900">{record.crop} · {record.disease}</p><p className="mt-1 text-xs text-stone-500">{formatDate(record.createdAt)}</p></div><p className="font-semibold text-emerald-800">{(record.confidence * 100).toFixed(1)}%</p></div>{selected === record.id && <div className="mt-4 border-t border-stone-100 pt-4 text-sm text-stone-600"><p>Model version: <span className="font-medium text-stone-900">v{record.modelVersion}</span></p>{record.thumbnail && <img src={URL.createObjectURL(record.thumbnail)} alt="Saved crop" className="mt-3 aspect-video w-full rounded-xl object-cover" />}</div>}</button>)}</div>}<BottomNav /></main>;
}
