export interface PartyInfo {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
}

export interface NDAData {
  purpose: string;
  effectiveDate: string;
  mndaTermYears: number;
  mndaTermExpires: boolean;
  confidentialityYears: number;
  confidentialityPerpetual: boolean;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  party1: PartyInfo;
  party2: PartyInfo;
}

export const defaultNDAData: NDAData = {
  purpose:
    "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: new Date().toISOString().split("T")[0],
  mndaTermYears: 1,
  mndaTermExpires: true,
  confidentialityYears: 1,
  confidentialityPerpetual: false,
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  party1: { name: "", title: "", company: "", noticeAddress: "" },
  party2: { name: "", title: "", company: "", noticeAddress: "" },
};
