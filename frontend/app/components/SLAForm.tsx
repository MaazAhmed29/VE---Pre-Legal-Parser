"use client";

import { useState } from "react";
import { SLAData, PartyInfo } from "@/app/types/sla";
import { supabase } from "@/app/lib/supabase";

interface SLAFormProps {
  data: SLAData;
  onChange: (data: SLAData) => void;
  documentId?: string | null;
  onSaved?: (id: string) => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">{children}</h3>;
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-colors" />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-colors resize-none" />
    </div>
  );
}

function PartyFields({ label, party, onChange }: { label: string; party: PartyInfo; onChange: (p: PartyInfo) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>{label}</SectionTitle>
      <Input label="Print Name" value={party.name} onChange={(v) => onChange({ ...party, name: v })} placeholder="John Doe" />
      <Input label="Title" value={party.title} onChange={(v) => onChange({ ...party, title: v })} placeholder="CEO" />
      <Input label="Company" value={party.company} onChange={(v) => onChange({ ...party, company: v })} placeholder="Acme Corp" />
      <Input label="Notice Address" value={party.noticeAddress} onChange={(v) => onChange({ ...party, noticeAddress: v })} placeholder="email@example.com" />
    </div>
  );
}

export default function SLAForm({ data, onChange, documentId, onSaved }: SLAFormProps) {
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const update = (partial: Partial<SLAData>) => onChange({ ...data, ...partial });

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");
    const title = data.licensor.company && data.licensee.company
      ? `${data.licensor.company} / ${data.licensee.company} SLA`
      : "Software License Agreement";
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const payload = { type: "Software-License-Agreement.md", title, data, user_id: user.id, updated_at: new Date().toISOString() };
    if (documentId) {
      const { error } = await supabase.from("documents").update(payload).eq("id", documentId);
      if (!error) { setSaveMsg("Saved"); setTimeout(() => setSaveMsg(""), 2000); }
    } else {
      const { data: newDoc, error } = await supabase.from("documents").insert(payload).select("id").single();
      if (!error && newDoc) { setSaveMsg("Saved"); onSaved?.(newDoc.id); setTimeout(() => setSaveMsg(""), 2000); }
    }
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <SectionTitle>Software License Agreement</SectionTitle>
        <button onClick={handleSave} disabled={saving}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-md hover:bg-zinc-100 disabled:opacity-50 transition-colors">
          {saving ? "Saving..." : saveMsg ? (
            <><svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{saveMsg}</>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Save</>
          )}
        </button>
      </div>

      <Textarea label="License Scope" value={data.licenseScope} onChange={(v) => update({ licenseScope: v })} placeholder="How the software may be used" />
      <Input label="Effective Date" value={data.effectiveDate} onChange={(v) => update({ effectiveDate: v })} type="date" />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">License Term</label>
        <div className="flex items-center gap-3">
          <input type="number" min={1} value={data.termMonths}
            onChange={(e) => update({ termMonths: parseInt(e.target.value) || 1 })}
            className="w-20 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400" />
          <span className="text-sm text-zinc-500">month(s)</span>
          <label className="flex items-center gap-2 ml-2 text-sm text-zinc-700">
            <input type="checkbox" checked={data.termAutoRenew}
              onChange={(e) => update({ termAutoRenew: e.target.checked })}
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20" />
            Auto-renew
          </label>
        </div>
      </div>

      <Input label="Fees" value={data.fees} onChange={(v) => update({ fees: v })} placeholder="e.g. $5,000/year" />
      <Input label="Governing Law (State)" value={data.governingLaw} onChange={(v) => update({ governingLaw: v })} placeholder="e.g. Delaware" />
      <Input label="Jurisdiction" value={data.jurisdiction} onChange={(v) => update({ jurisdiction: v })} placeholder="e.g. New Castle, DE" />
      <Textarea label="Modifications (optional)" value={data.modifications} onChange={(v) => update({ modifications: v })} placeholder="List any modifications" rows={3} />

      <div className="border-t border-zinc-100 pt-5">
        <PartyFields label="Licensor" party={data.licensor} onChange={(p) => update({ licensor: p })} />
      </div>
      <div className="border-t border-zinc-100 pt-5">
        <PartyFields label="Licensee" party={data.licensee} onChange={(p) => update({ licensee: p })} />
      </div>
    </div>
  );
}
