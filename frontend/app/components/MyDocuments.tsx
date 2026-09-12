"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

interface SavedDocument {
  id: string;
  type: string;
  title: string;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface MyDocumentsProps {
  onLoad: (doc: SavedDocument) => void;
  refreshKey?: number;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function documentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "Mutual-NDA.md": "Mutual NDA",
    "CSA.md": "Cloud Service Agreement",
    "PSA.md": "Professional Services Agreement",
    "Design-Partner-Agreement.md": "Design Partner Agreement",
    "Software-License-Agreement.md": "Software License Agreement",
  };
  return labels[type] || type.replace(".md", "").replace(/-/g, " ");
}

export default function MyDocuments({ onLoad, refreshKey }: MyDocumentsProps) {
  const [docs, setDocs] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchDocs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("documents")
      .select("id, type, title, data, created_at, updated_at")
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setDocs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await supabase.from("documents").delete().eq("id", id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-zinc-400">
        Loading...
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="py-10 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 mb-3">
          <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-600">No saved documents</p>
        <p className="text-xs text-zinc-400 mt-1">
          Choose a template below to create one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {docs.map((doc) => (
        <div
          key={doc.id}
          className="bg-white rounded-lg border border-zinc-200 p-4 hover:border-zinc-300 hover:shadow-card transition-all"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-900 truncate">
              {doc.title || documentTypeLabel(doc.type)}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-zinc-400">
                {documentTypeLabel(doc.type)}
              </span>
              <span className="text-zinc-300">/</span>
              <span className="text-xs text-zinc-400">
                {formatDate(doc.updated_at)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => onLoad(doc)}
              className="flex-1 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-md hover:bg-zinc-100 transition-colors"
            >
              Open
            </button>
            <button
              onClick={() => handleDelete(doc.id)}
              disabled={deleting === doc.id}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-md hover:bg-red-100 disabled:opacity-50 transition-colors"
            >
              {deleting === doc.id ? "..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
