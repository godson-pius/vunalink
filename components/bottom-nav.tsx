"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon, Home01Icon, ScanIcon, Settings01Icon, User03Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: Home01Icon },
  { href: "/history", label: "History", icon: File01Icon },
  { href: "/scan", label: "Scan", icon: ScanIcon },
  { href: "/settings", label: "Settings", icon: Settings01Icon },
  { href: "/profile", label: "Profile", icon: User03Icon },
];

export function BottomNav() {
  const pathname = usePathname();
  return <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-stone-200 bg-white/95 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur" aria-label="Main navigation"><div className="mx-auto grid max-w-xl grid-cols-5 items-end">{items.map((item) => { const active = pathname === item.href; const scan = item.href === "/scan"; return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${scan ? "-mt-6" : ""} ${active && !scan ? "text-emerald-800" : "text-stone-500 hover:text-emerald-700"}`}><span className={`flex items-center justify-center ${scan ? "h-14 w-14 rounded-full bg-emerald-800 text-white shadow-lg ring-4 ring-white" : "h-7"}`} aria-hidden="true"><HugeiconsIcon icon={item.icon} size={scan ? 28 : 21} strokeWidth={active ? 2 : 1.6} /></span><span className={scan ? "font-semibold text-emerald-800" : ""}>{item.label}</span></Link>; })}</div></nav>;
}
