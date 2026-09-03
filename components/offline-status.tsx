"use client";

import { useEffect, useState } from "react";

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${isOnline ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`} role="status" aria-live="polite">
      <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-600" : "bg-amber-600"}`} aria-hidden="true" />
      {isOnline ? "Online" : "Offline mode"}
    </div>
  );
}
