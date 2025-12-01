"use client";

import Link from "next/link";

export default function TerminalSelector() {
  const terminals = [
    { label: "Manco Cápac", slug: "manco-capac" },
    { label: "Guadalupe", slug: "guadalupe" },
    { label: "DPW", slug: "dpw" },
    { label: "APM", slug: "apm" },
  ];

  return (
    <div className="flex flex-col gap-4 items-center mt-12">
      {terminals.map((t) => (
        <Link
          key={t.slug}
          href={`/terminal/${t.slug}`}
          className="px-6 py-3 text-xl bg-blue-100 rounded-xl hover:bg-blue-200"
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
