"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import DocumentSelector from "./components/DocumentSelector";
import MyDocuments from "./components/MyDocuments";
import NDADownloadButton from "./components/NDADownloadButton";

import NDAForm from "./components/NDAForm";
import NDAPreview from "./components/NDAPreview";
import { defaultNDAData } from "./types/nda";

import CSAForm from "./components/CSAForm";
import CSAPreview from "./components/CSAPreview";
import { defaultCSAData } from "./types/csa";

import DPAForm from "./components/DPAForm";
import DPAPreview from "./components/DPAPreview";
import { defaultDPAData } from "./types/dpa";

import PSAForm from "./components/PSAForm";
import PSAPreview from "./components/PSAPreview";
import { defaultPSAData } from "./types/psa";

import SLAForm from "./components/SLAForm";
import SLAPreview from "./components/SLAPreview";
import { defaultSLAData } from "./types/sla";

type View = "home" | "editor";

const DOC_CONFIG: Record<string, { name: string; Form: React.ComponentType<{ data: unknown; onChange: (d: unknown) => void; documentId?: string | null; onSaved?: (id: string) => void }>; Preview: React.ComponentType<{ data: unknown }>; defaultData: unknown; targetId: string }> = {
  "Mutual-NDA.md": { name: "Mutual NDA", Form: NDAForm as never, Preview: NDAPreview as never, defaultData: defaultNDAData, targetId: "nda-preview" },
  "CSA.md": { name: "Cloud Service Agreement", Form: CSAForm as never, Preview: CSAPreview as never, defaultData: defaultCSAData, targetId: "csa-preview" },
  "Design-Partner-Agreement.md": { name: "Design Partner Agreement", Form: DPAForm as never, Preview: DPAPreview as never, defaultData: defaultDPAData, targetId: "dpa-preview" },
  "PSA.md": { name: "Professional Services Agreement", Form: PSAForm as never, Preview: PSAPreview as never, defaultData: defaultPSAData, targetId: "psa-preview" },
  "Software-License-Agreement.md": { name: "Software License Agreement", Form: SLAForm as never, Preview: SLAPreview as never, defaultData: defaultSLAData, targetId: "sla-preview" },
};

export default function Home() {
  const [data, setData] = useState<Record<string, unknown>>(defaultNDAData as unknown as Record<string, unknown>);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [view, setView] = useState<View>("home");
  const [docsRefreshKey, setDocsRefreshKey] = useState(0);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-sm text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push("/auth");
    return null;
  }

  const config = selectedDoc ? DOC_CONFIG[selectedDoc] : null;

  const handleSelectDoc = (filename: string) => {
    setSelectedDoc(filename);
    setDocumentId(null);
    const cfg = DOC_CONFIG[filename];
    setData(cfg ? (cfg.defaultData as Record<string, unknown>) : {});
    setView("editor");
  };

  const handleOpenDoc = (doc: { id: string; type: string; data: Record<string, unknown> }) => {
    setSelectedDoc(doc.type);
    setDocumentId(doc.id);
    if (doc.data) {
      setData(doc.data);
    }
    setView("editor");
  };

  const handleBack = () => {
    setSelectedDoc(null);
    setDocumentId(null);
    setData(defaultNDAData as unknown as Record<string, unknown>);
    setView("home");
    setDocsRefreshKey((k) => k + 1);
  };

  const handleSaved = (id: string) => {
    setDocumentId(id);
    setDocsRefreshKey((k) => k + 1);
  };

  const headerTitle = view === "home" ? "Pre Legal" : config?.name ?? "Document";
  const headerSubtitle = view === "home" ? undefined : "Fill in the fields and download your document";

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        showBack={view === "editor"}
        onBack={handleBack}
        actions={
          view === "editor" && config ? (
            <NDADownloadButton targetId={config.targetId} />
          ) : undefined
        }
      />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {view === "home" ? (
          <div className="space-y-8">
            <section>
              <h2 className="text-sm font-medium text-zinc-900 mb-3">Your Documents</h2>
              <MyDocuments onLoad={handleOpenDoc} refreshKey={docsRefreshKey} />
            </section>
            <section>
              <h2 className="text-sm font-medium text-zinc-900 mb-3">New Document</h2>
              <DocumentSelector onSelect={handleSelectDoc} />
            </section>
          </div>
        ) : config ? (
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-[400px] lg:flex-shrink-0">
              <div className="bg-white rounded-xl border border-zinc-200 p-5 max-h-[calc(100vh-100px)] overflow-y-auto lg:sticky lg:top-5">
                <config.Form data={data} onChange={(d: unknown) => setData(d as Record<string, unknown>)} documentId={documentId} onSaved={handleSaved} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl border border-zinc-200 p-6 max-h-[calc(100vh-100px)] overflow-y-auto lg:sticky lg:top-5">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                  <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Preview</h2>
                  <span className="text-[11px] text-zinc-400">Live</span>
                </div>
                <config.Preview data={data} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-sm text-zinc-400">Unknown document type</div>
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-[11px] text-zinc-400 text-center">
            Pre Legal provides document templates for informational purposes only.
            Consult a licensed attorney before relying on any generated document.
          </p>
        </div>
      </footer>
    </div>
  );
}
