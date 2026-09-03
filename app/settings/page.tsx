import { BottomNav } from "@/components/bottom-nav";

export default function SettingsPage() { return <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-28 pt-8 sm:px-8"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Settings</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-950">App settings</h1><p className="mt-4 leading-7 text-stone-600">Language and other preferences will be available here.</p><BottomNav /></main>; }
