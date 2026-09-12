"use client";

import { useState, useEffect } from "react";

interface CatalogItem {
  name: string;
  description: string;
  filename: string;
}

interface DocumentSelectorProps {
  onSelect: (filename: string) => void;
}

const ICONS: Record<string, string> = {
  "Mutual-NDA.md": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  "CSA.md": "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  default: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

function DocIcon({ filename }: { filename: string }) {
  const d = ICONS[filename] || ICONS.default;
  return (
    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export default function DocumentSelector({ onSelect }: DocumentSelectorProps) {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data) => {
        setCatalog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-500">Loading documents...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800">Choose a document</h2>
        <p className="text-sm text-slate-500 mt-1">
          Select a legal document template to get started
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {catalog.map((item) => (
          <button
            key={item.filename}
            onClick={() => onSelect(item.filename)}
            className="text-left p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <DocIcon filename={item.filename} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
