"use client";

import { NDAData } from "@/app/types/nda";

interface NDAPreviewProps {
  data: NDAData;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "[Date]";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NDAPreview({ data }: NDAPreviewProps) {
  return (
    <div
      id="nda-preview"
      className="bg-white text-slate-900 text-[13px] leading-relaxed font-serif"
      style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
    >
      {/* Cover Page */}
      <h1 className="text-xl font-bold text-center mb-6">
        Mutual Non-Disclosure Agreement
      </h1>

      <h3 className="font-bold mt-5 mb-1">Purpose</h3>
      <p className="italic text-slate-500 text-xs mb-1">
        How Confidential Information may be used
      </p>
      <p className="mb-4 pl-4 border-l-2 border-slate-300">
        {data.purpose || "[Purpose]"}
      </p>

      <h3 className="font-bold mt-5 mb-1">Effective Date</h3>
      <p className="mb-4 pl-4 border-l-2 border-slate-300">
        {formatDate(data.effectiveDate)}
      </p>

      <h3 className="font-bold mt-5 mb-1">MNDA Term</h3>
      <p className="italic text-slate-500 text-xs mb-1">
        The length of this MNDA
      </p>
      <ul className="pl-4 mb-4 space-y-1">
        <li className="flex items-start gap-2">
          <span className="mt-0.5">{data.mndaTermExpires ? "[x]" : "[ ]"}</span>
          <span>
            Expires [{data.mndaTermYears} year(s)] from Effective Date.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5">{!data.mndaTermExpires ? "[x]" : "[ ]"}</span>
          <span>
            Continues until terminated in accordance with the terms of the MNDA.
          </span>
        </li>
      </ul>

      <h3 className="font-bold mt-5 mb-1">Term of Confidentiality</h3>
      <p className="italic text-slate-500 text-xs mb-1">
        How long Confidential Information is protected
      </p>
      <ul className="pl-4 mb-4 space-y-1">
        <li className="flex items-start gap-2">
          <span className="mt-0.5">
            {!data.confidentialityPerpetual ? "[x]" : "[ ]"}
          </span>
          <span>
            [{data.confidentialityYears} year(s)] from Effective Date, but in
            the case of trade secrets until Confidential Information is no
            longer considered a trade secret under applicable laws.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5">
            {data.confidentialityPerpetual ? "[x]" : "[ ]"}
          </span>
          <span>In perpetuity.</span>
        </li>
      </ul>

      <h3 className="font-bold mt-5 mb-1">Governing Law &amp; Jurisdiction</h3>
      <p className="mb-1">
        Governing Law: {data.governingLaw || "[Fill in state]"}
      </p>
      <p className="mb-4">
        Jurisdiction:{" "}
        {data.jurisdiction || '[Fill in city or county and state, i.e. "courts located in New Castle, DE"]'}
      </p>

      {data.modifications && (
        <>
          <h3 className="font-bold mt-5 mb-1">MNDA Modifications</h3>
          <p className="mb-4 pl-4 border-l-2 border-slate-300 whitespace-pre-wrap">
            {data.modifications}
          </p>
        </>
      )}

      <p className="mt-6 mb-4 text-center text-sm">
        By signing this Cover Page, each party agrees to enter into this MNDA
        as of the Effective Date.
      </p>

      {/* Signature Table */}
      <table className="w-full border-collapse text-xs mt-4 mb-6">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2 bg-slate-50 w-1/4"></th>
            <th className="border border-slate-300 p-2 bg-slate-50 text-center w-[37.5%]">
              PARTY 1
            </th>
            <th className="border border-slate-300 p-2 bg-slate-50 text-center w-[37.5%]">
              PARTY 2
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 p-2 font-medium">Signature</td>
            <td className="border border-slate-300 p-2 h-8"></td>
            <td className="border border-slate-300 p-2 h-8"></td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-2 font-medium">
              Print Name
            </td>
            <td className="border border-slate-300 p-2">
              {data.party1.name || ""}
            </td>
            <td className="border border-slate-300 p-2">
              {data.party2.name || ""}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-2 font-medium">Title</td>
            <td className="border border-slate-300 p-2">
              {data.party1.title || ""}
            </td>
            <td className="border border-slate-300 p-2">
              {data.party2.title || ""}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-2 font-medium">
              Company
            </td>
            <td className="border border-slate-300 p-2">
              {data.party1.company || ""}
            </td>
            <td className="border border-slate-300 p-2">
              {data.party2.company || ""}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-2 font-medium">
              Notice Address
            </td>
            <td className="border border-slate-300 p-2">
              {data.party1.noticeAddress || ""}
            </td>
            <td className="border border-slate-300 p-2">
              {data.party2.noticeAddress || ""}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-2 font-medium">Date</td>
            <td className="border border-slate-300 p-2 h-8"></td>
            <td className="border border-slate-300 p-2 h-8"></td>
          </tr>
        </tbody>
      </table>

      <p className="text-center text-xs text-slate-500 italic mb-8">
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use
        under CC BY 4.0.
      </p>

      {/* Standard Terms */}
      <div className="border-t-2 border-slate-300 pt-6 mt-6">
        <h2 className="text-base font-bold text-center mb-4">Standard Terms</h2>

        <ol className="space-y-3 text-justify list-decimal list-inside">
          <li>
            <strong>Introduction</strong>. This Mutual Non-Disclosure Agreement
            (which incorporates these Standard Terms and the Cover Page
            (defined below)) (&ldquo;<strong>MNDA</strong>&rdquo;) allows each
            party (&ldquo;<strong>Disclosing Party</strong>&rdquo;) to disclose
            or make available information in connection with the Purpose which
            (1) the Disclosing Party identifies to the receiving party
            (&ldquo;<strong>Receiving Party</strong>&rdquo;) as
            &ldquo;confidential&rdquo;, &ldquo;proprietary&rdquo;, or the like
            or (2) should be reasonably understood as confidential or
            proprietary due to its nature and the circumstances of its
            disclosure (&ldquo;<strong>Confidential Information</strong>
            &rdquo;). Each party&apos;s Confidential Information also includes
            the existence and status of the parties&apos; discussions and
            information on the Cover Page. Confidential Information includes
            technical or business information, product designs or roadmaps,
            requirements, pricing, security and compliance documentation,
            technology, inventions and know-how. To use this MNDA, the parties
            must complete and sign a cover page incorporating these Standard
            Terms (&ldquo;<strong>Cover Page</strong>&rdquo;). Each party is
            identified on the Cover Page and capitalized terms have the meanings
            given herein or on the Cover Page.
          </li>

          <li>
            <strong>Use and Protection of Confidential Information</strong>. The
            Receiving Party shall: (a) use Confidential Information solely for
            the Purpose; (b) not disclose Confidential Information to third
            parties without the Disclosing Party&apos;s prior written approval,
            except that the Receiving Party may disclose Confidential
            Information to its employees, agents, advisors, contractors and
            other representatives having a reasonable need to know for the
            Purpose, provided these representatives are bound by confidentiality
            obligations no less protective of the Disclosing Party than the
            applicable terms in this MNDA and the Receiving Party remains
            responsible for their compliance with this MNDA; and (c) protect
            Confidential Information using at least the same protections the
            Receiving Party uses for its own similar information but no less
            than a reasonable standard of care.
          </li>

          <li>
            <strong>Exceptions</strong>. The Receiving Party&apos;s obligations
            in this MNDA do not apply to information that it can demonstrate:
            (a) is or becomes publicly available through no fault of the
            Receiving Party; (b) it rightfully knew or possessed prior to
            receipt from the Disclosing Party without confidentiality
            restrictions; (c) it rightfully obtained from a third party without
            confidentiality restrictions; or (d) it independently developed
            without using or referencing the Confidential Information.
          </li>

          <li>
            <strong>Disclosures Required by Law</strong>. The Receiving Party
            may disclose Confidential Information to the extent required by law,
            regulation or regulatory authority, subpoena or court order,
            provided (to the extent legally permitted) it provides the
            Disclosing Party reasonable advance notice of the required disclosure
            and reasonably cooperates, at the Disclosing Party&apos;s expense,
            with the Disclosing Party&apos;s efforts to obtain confidential
            treatment for the Confidential Information.
          </li>

          <li>
            <strong>Term and Termination</strong>. This MNDA commences on the
            Effective Date and expires at the end of the MNDA Term. Either party
            may terminate this MNDA for any or no reason upon written notice to
            the other party. The Receiving Party&apos;s obligations relating to
            Confidential Information will survive for the Term of
            Confidentiality, despite any expiration or termination of this MNDA.
          </li>

          <li>
            <strong>Return or Destruction of Confidential Information</strong>.
            Upon expiration or termination of this MNDA or upon the Disclosing
            Party&apos;s earlier request, the Receiving Party will: (a) cease
            using Confidential Information; (b) promptly after the Disclosing
            Party&apos;s written request, destroy all Confidential Information
            in the Receiving Party&apos;s possession or control or return it to
            the Disclosing Party; and (c) if requested by the Disclosing Party,
            confirm its compliance with these obligations in writing. As an
            exception to subsection (b), the Receiving Party may retain
            Confidential Information in accordance with its standard backup or
            record retention policies or as required by law, but the terms of
            this MNDA will continue to apply to the retained Confidential
            Information.
          </li>

          <li>
            <strong>Proprietary Rights</strong>. The Disclosing Party retains
            all of its intellectual property and other rights in its
            Confidential Information and its disclosure to the Receiving Party
            grants no license under such rights.
          </li>

          <li>
            <strong>Disclaimer</strong>. ALL CONFIDENTIAL INFORMATION IS
            PROVIDED &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT
            WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE,
            MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
          </li>

          <li>
            <strong>Governing Law and Jurisdiction</strong>. This MNDA and all
            matters relating hereto are governed by, and construed in accordance
            with, the laws of the State of {data.governingLaw || "[Governing Law]"}, without
            regard to the conflict of laws provisions of such Governing Law. Any
            legal suit, action, or proceeding relating to this MNDA must be
            instituted in the federal or state courts located in{" "}
            {data.jurisdiction || "[Jurisdiction]"}. Each party irrevocably submits to the
            exclusive jurisdiction of such Jurisdiction in any such suit, action,
            or proceeding.
          </li>

          <li>
            <strong>Equitable Relief</strong>. A breach of this MNDA may cause
            irreparable harm for which monetary damages are an insufficient
            remedy. Upon a breach of this MNDA, the Disclosing Party is entitled
            to seek appropriate equitable relief, including an injunction, in
            addition to its other remedies.
          </li>

          <li>
            <strong>General</strong>. Neither party has an obligation under this
            MNDA to disclose Confidential Information to the other or proceed
            with any proposed transaction. Neither party may assign this MNDA
            without the prior written consent of the other party, except that
            either party may assign this MNDA in connection with a merger,
            reorganization, acquisition or other transfer of all or substantially
            all its assets or voting securities. Any assignment in violation of
            this Section is null and void. This MNDA will bind and inure to the
            benefit of each party&apos;s permitted successors and assigns.
            Waivers must be signed by the waiving party&apos;s authorized
            representative and cannot be implied from conduct. If any provision
            of this MNDA is held unenforceable, it will be limited to the
            minimum extent necessary so the rest of this MNDA remains in effect.
            This MNDA (including the Cover Page) constitutes the entire
            agreement of the parties with respect to its subject matter, and
            supersedes all prior and contemporaneous understandings, agreements,
            representations, and warranties, whether written or oral, regarding
            such subject matter. This MNDA may only be amended, modified,
            waived, or supplemented by an agreement in writing signed by both
            parties. Notices, requests and approvals under this MNDA must be sent
            in writing to the email or postal addresses on the Cover Page and are
            deemed delivered on receipt. This MNDA may be executed in
            counterparts, including electronic copies, each of which is deemed an
            original and which together form the same agreement.
          </li>
        </ol>

        <p className="text-center text-xs text-slate-500 italic mt-6">
          Common Paper Mutual Non-Disclosure Agreement Version 1.0 free to use
          under CC BY 4.0.
        </p>
      </div>

    </div>
  );
}
