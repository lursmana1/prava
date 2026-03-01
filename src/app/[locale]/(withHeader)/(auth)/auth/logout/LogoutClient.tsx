"use client";

import { useEffect } from "react";

function getLandingPath() {
  const locale = typeof window !== "undefined" ? window.location.pathname.split("/")[1] || "ka" : "ka";
  return `/${locale}`;
}

export default function LogoutClient() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseUrl) {
      window.location.href = getLandingPath();
      return;
    }

    fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        window.location.href = getLandingPath();
      })
      .catch(() => {
        window.location.href = getLandingPath();
      });
  }, []);

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="text-slate-600">გასვლა...</p>
    </div>
  );
}
