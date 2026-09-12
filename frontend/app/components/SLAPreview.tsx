"use client";

import { SLAData } from "@/app/types/sla";

function formatDate(dateStr: string): string {
  if (!dateStr) return "[Date]";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function SLAPreview({ data }: { data: SLAData }) {
  return (
    <div id="sla-preview" className="bg-white text-slate-900 text-[13px] leading-relaxed font-serif" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
      <h1 className="text-xl font-bold text-center mb-6">Software License Agreement</h1>

      <h3 className="font-bold mt-5 mb-1">License Scope</h3>
      <p className="mb-4 pl-4 border-l-2 border-slate-300">{data.licenseScope || "[License Scope]"}</p>

      <h3 className="font-bold mt-5 mb-1">Effective Date</h3>
      <p className="mb-4 pl-4 border-l-2 border-slate-300">{formatDate(data.effectiveDate)}</p>

      <h3 className="font-bold mt-5 mb-1">License Term</h3>
      <ul className="pl-4 mb-4 space-y-1">
        <li className="flex items-start gap-2">
          <span className="mt-0.5">{data.termAutoRenew ? "[x]" : "[ ]"}</span>
          <span>[{data.termMonths} month(s)] auto-renewing.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5">{!data.termAutoRenew ? "[x]" : "[ ]"}</span>
          <span>[{data.termMonths} month(s)] fixed term.</span>
        </li>
      </ul>

      <h3 className="font-bold mt-5 mb-1">Fees</h3>
      <p className="mb-4 pl-4 border-l-2 border-slate-300">{data.fees || "[Fees]"}</p>

      <h3 className="font-bold mt-5 mb-1">Governing Law &amp; Jurisdiction</h3>
      <p className="mb-1">Governing Law: {data.governingLaw || "[Governing Law]"}</p>
      <p className="mb-4">Jurisdiction: {data.jurisdiction || "[Jurisdiction]"}</p>

      {data.modifications && (
        <>
          <h3 className="font-bold mt-5 mb-1">Modifications</h3>
          <p className="mb-4 pl-4 border-l-2 border-slate-300 whitespace-pre-wrap">{data.modifications}</p>
        </>
      )}

      <p className="mt-6 mb-4 text-center text-sm">By signing this Cover Page, each party agrees to enter into this Software License Agreement as of the Effective Date.</p>

      <table className="w-full border-collapse text-xs mt-4 mb-6">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2 bg-slate-50 w-1/4"></th>
            <th className="border border-slate-300 p-2 bg-slate-50 text-center w-[37.5%]">LICENSOR</th>
            <th className="border border-slate-300 p-2 bg-slate-50 text-center w-[37.5%]">LICENSEE</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-slate-300 p-2 font-medium">Signature</td><td className="border border-slate-300 p-2 h-8"></td><td className="border border-slate-300 p-2 h-8"></td></tr>
          <tr><td className="border border-slate-300 p-2 font-medium">Print Name</td><td className="border border-slate-300 p-2">{data.licensor.name || ""}</td><td className="border border-slate-300 p-2">{data.licensee.name || ""}</td></tr>
          <tr><td className="border border-slate-300 p-2 font-medium">Title</td><td className="border border-slate-300 p-2">{data.licensor.title || ""}</td><td className="border border-slate-300 p-2">{data.licensee.title || ""}</td></tr>
          <tr><td className="border border-slate-300 p-2 font-medium">Company</td><td className="border border-slate-300 p-2">{data.licensor.company || ""}</td><td className="border border-slate-300 p-2">{data.licensee.company || ""}</td></tr>
          <tr><td className="border border-slate-300 p-2 font-medium">Notice Address</td><td className="border border-slate-300 p-2">{data.licensor.noticeAddress || ""}</td><td className="border border-slate-300 p-2">{data.licensee.noticeAddress || ""}</td></tr>
          <tr><td className="border border-slate-300 p-2 font-medium">Date</td><td className="border border-slate-300 p-2 h-8"></td><td className="border border-slate-300 p-2 h-8"></td></tr>
        </tbody>
      </table>

      <p className="text-center text-xs text-slate-500 italic mb-8">Common Paper Software License Agreement (Version 1.0) free to use under CC BY 4.0.</p>
    </div>
  );
}
