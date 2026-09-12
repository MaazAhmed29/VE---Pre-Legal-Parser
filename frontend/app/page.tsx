"use client";

import { useState } from "react";
import NDAForm from "./components/NDAForm";
import NDAPreview from "./components/NDAPreview";
import NDADownloadButton from "./components/NDADownloadButton";
import { NDAData, defaultNDAData } from "./types/nda";

export default function Home() {
  const [data, setData] = useState<NDAData>(defaultNDAData);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Mutual NDA Generator
            </h1>
            <p className="text-sm text-slate-500">
              Pre Legal Parser &mdash; Create and download Mutual NDA documents
            </p>
          </div>
          <NDADownloadButton targetId="nda-preview" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Panel */}
          <div className="w-full lg:w-[420px] lg:flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-h-[calc(100vh-120px)] overflow-y-auto lg:sticky lg:top-6">
              <NDAForm data={data} onChange={setData} />
            </div>
          </div>

          {/* Preview Panel */}
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
      </div>
    </div>
  );
}
