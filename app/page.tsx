import Image from "next/image";
import { OfflineStatus } from "@/components/offline-status";

const copy = {
  eyebrow: "Your crop companion",
  title: "Protect your harvest.",
  description: "Take a photo of a crop to learn what may be affecting it and what to do next.",
  scan: "Scan Crop",
  scanHint: "Use your camera or choose a photo",
  history: "View History",
  historyHint: "See your previous crop checks",
};

function LeafIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6"><path d="M19.5 3.5C12.2 3.6 6.3 6.2 5 12.3c-.8 3.7 1.4 6.2 4.5 6.2 5.8 0 8.8-6.2 10-15Z" fill="currentColor" /><path d="M4 21c2.6-4.7 6-7.5 11-10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

function HistoryIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5"><path d="M4 5h16v15H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/vunalink-icon.png" alt="" width={44} height={44} className="rounded-full" priority />
          <div><p className="text-lg font-bold tracking-tight text-emerald-900">VunaLink</p><p className="text-xs text-stone-500">Healthy crops, stronger harvests</p></div>
        </div>
        <OfflineStatus />
      </header>

      <section className="flex flex-1 flex-col justify-center py-14 sm:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{copy.eyebrow}</p>
        <h1 className="max-w-sm text-[2.75rem] font-bold leading-[1.05] tracking-tight text-stone-950 sm:text-6xl">{copy.title}</h1>
        <p className="mt-5 max-w-md text-base leading-7 text-stone-600 sm:text-lg">{copy.description}</p>

        <div className="mt-9 space-y-3">
          <button type="button" className="flex min-h-20 w-full items-center gap-4 rounded-2xl bg-emerald-800 px-5 text-left text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:bg-emerald-950">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-emerald-100"><LeafIcon /></span>
            <span className="flex flex-col"><span className="text-lg font-semibold">{copy.scan}</span><span className="text-sm text-emerald-100">{copy.scanHint}</span></span>
            <span className="ml-auto text-2xl text-emerald-200" aria-hidden="true">→</span>
          </button>
          <button type="button" className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 text-left text-stone-800 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:bg-emerald-100">
            <span className="text-emerald-800"><HistoryIcon /></span>
            <span className="flex flex-col"><span className="font-semibold">{copy.history}</span><span className="text-sm text-stone-500">{copy.historyHint}</span></span>
            <span className="ml-auto text-xl text-stone-400" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* <footer className="border-t border-stone-200 pt-5 text-center text-sm text-stone-500">Works with or without internet.</footer> */}
    </main>
  );
}
