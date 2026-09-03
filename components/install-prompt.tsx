"use client";

import { useEffect, useState } from "react";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  useEffect(() => {
    const onBeforeInstall = (event: Event) => { event.preventDefault(); setInstallEvent(event as InstallEvent); };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);
  if (!installEvent) return null;
  const install = async () => { await installEvent.prompt(); setInstallEvent(null); };
  return <div role="dialog" aria-label="Install VunaLink" className="fixed inset-x-4 top-4 z-20 mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-white p-4 text-sm shadow-lg"><p className="text-stone-700">Install VunaLink for quick offline access.</p><div className="flex shrink-0 gap-3"><button type="button" onClick={() => setInstallEvent(null)} className="min-h-11 rounded-lg px-2 font-medium text-stone-500 focus-visible:outline-2 focus-visible:outline-emerald-700">Not now</button><button type="button" onClick={() => void install()} className="min-h-11 rounded-lg px-2 font-semibold text-emerald-800 focus-visible:outline-2 focus-visible:outline-emerald-700">Install</button></div></div>;
}
