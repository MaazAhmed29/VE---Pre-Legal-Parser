"use client";

import { NDAData, PartyInfo } from "@/app/types/nda";

interface NDAFormProps {
  data: NDAData;
  onChange: (data: NDAData) => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 mb-4">
      {children}
    </h3>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
      />
    </div>
  );
}

function PartyFields({
  label,
  party,
  onChange,
}: {
  label: string;
  party: PartyInfo;
  onChange: (p: PartyInfo) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>{label}</SectionTitle>
      <Input
        label="Print Name"
        value={party.name}
        onChange={(v) => onChange({ ...party, name: v })}
        placeholder="John Doe"
      />
      <Input
        label="Title"
        value={party.title}
        onChange={(v) => onChange({ ...party, title: v })}
        placeholder="CEO"
      />
      <Input
        label="Company"
        value={party.company}
        onChange={(v) => onChange({ ...party, company: v })}
        placeholder="Acme Corp"
      />
      <Input
        label="Notice Address"
        value={party.noticeAddress}
        onChange={(v) => onChange({ ...party, noticeAddress: v })}
        placeholder="email@example.com or postal address"
      />
    </div>
  );
}

export default function NDAForm({ data, onChange }: NDAFormProps) {
  const update = (partial: Partial<NDAData>) =>
    onChange({ ...data, ...partial });

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>MNDA Details</SectionTitle>

      <Textarea
        label="Purpose"
        value={data.purpose}
        onChange={(v) => update({ purpose: v })}
        placeholder="How Confidential Information may be used"
      />

      <Input
        label="Effective Date"
        value={data.effectiveDate}
        onChange={(v) => update({ effectiveDate: v })}
        type="date"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          MNDA Term
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            value={data.mndaTermYears}
            onChange={(e) =>
              update({ mndaTermYears: parseInt(e.target.value) || 1 })
            }
            className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-600">year(s)</span>
          <label className="flex items-center gap-2 ml-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={data.mndaTermExpires}
              onChange={(e) => update({ mndaTermExpires: e.target.checked })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Expires from Effective Date
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Term of Confidentiality
        </label>
        <div className="flex items-center gap-3">
          {!data.confidentialityPerpetual && (
            <>
              <input
                type="number"
                min={1}
                value={data.confidentialityYears}
                onChange={(e) =>
                  update({
                    confidentialityYears: parseInt(e.target.value) || 1,
                  })
                }
                className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600">year(s)</span>
            </>
          )}
          <label className="flex items-center gap-2 ml-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={data.confidentialityPerpetual}
              onChange={(e) =>
                update({ confidentialityPerpetual: e.target.checked })
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            In perpetuity
          </label>
        </div>
      </div>

      <Input
        label="Governing Law (State)"
        value={data.governingLaw}
        onChange={(v) => update({ governingLaw: v })}
        placeholder="e.g. Delaware"
      />

      <Input
        label="Jurisdiction"
        value={data.jurisdiction}
        onChange={(v) => update({ jurisdiction: v })}
        placeholder='e.g. courts located in New Castle, DE'
      />

      <Textarea
        label="MNDA Modifications (optional)"
        value={data.modifications}
        onChange={(v) => update({ modifications: v })}
        placeholder="List any modifications to the MNDA"
        rows={4}
      />

      <div className="border-t border-slate-200 pt-6">
        <PartyFields
          label="Party 1"
          party={data.party1}
          onChange={(p) => update({ party1: p })}
        />
      </div>

      <div className="border-t border-slate-200 pt-6">
        <PartyFields
          label="Party 2"
          party={data.party2}
          onChange={(p) => update({ party2: p })}
        />
      </div>
    </div>
  );
}
