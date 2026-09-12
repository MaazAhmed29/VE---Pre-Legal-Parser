"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import DocumentSelector from "./components/DocumentSelector";
import NDAForm from "./components/NDAForm";
import NDAPreview from "./components/NDAPreview";
import NDADownloadButton from "./components/NDADownloadButton";
import TemplatePreview from "./components/TemplatePreview";
import { NDAData, defaultNDAData } from "./types/nda";

const NDA_FILE = "Mutual-NDA.md";

export default function Home() {
  const [data, setData] = useState<NDAData>(defaultNDAData);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/auth");
    return null;
  }

  const isNDA = selectedDoc === NDA_FILE;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedDoc && (
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {selectedDoc ? (isNDA ? "Mutual NDA Generator" : "Document Preview") : "Pre Legal"}
              </h1>
              <p className="text-sm text-slate-500">
                {selectedDoc
                  ? isNDA
                    ? "Create and download Mutual NDA documents"
                    : "Viewing template content"
                  : "Draft legal agreements with AI"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">{user.email}</span>
            <button
              onClick={() => {
                logout();
                router.push("/auth");
              }}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Sign out
            </button>
            {selectedDoc && isNDA && (
              <NDADownloadButton targetId="nda-preview" />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!selectedDoc ? (
          <DocumentSelector onSelect={setSelectedDoc} />
        ) : isNDA ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[420px] lg:flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-h-[calc(100vh-120px)] overflow-y-auto lg:sticky lg:top-6">
                <NDAForm data={data} onChange={setData} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-h-[calc(100vh-120px)] overflow-y-auto lg:sticky lg:top-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Document Preview
                  </h2>
                  <span className="text-xs text-slate-400">Live preview</span>
                </div>
                <NDAPreview data={data} />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <TemplatePreview filename={selectedDoc} />
          </div>
        )}
      </div>
    </div>
  );
}
