import { BottomNav } from "@/components/bottom-nav";
import { HugeiconsIcon } from "@hugeicons/react";
import { User03Icon } from "@hugeicons/core-free-icons";

export default function ProfilePage() {
  return <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-28 pt-8 sm:px-8"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Profile</p><div className="mt-5 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><HugeiconsIcon icon={User03Icon} size={28} /></span><div><h1 className="text-xl font-bold tracking-tight text-stone-950">Your profile</h1><p className="mt-1 text-sm text-stone-500">Your farmer profile will appear here.</p></div></div><BottomNav /></main>;
}
