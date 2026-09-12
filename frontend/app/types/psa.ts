export interface PartyInfo {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
}

export interface PSAData {
  scopeOfWork: string;
  effectiveDate: string;
  termMonths: number;
  termAutoRenew: boolean;
  fees: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  provider: PartyInfo;
  client: PartyInfo;
}

export const defaultPSAData: PSAData = {
  scopeOfWork: "Professional services as described in a Statement of Work.",
  effectiveDate: new Date().toISOString().split("T")[0],
  termMonths: 12,
  termAutoRenew: true,
  fees: "",
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  provider: { name: "", title: "", company: "", noticeAddress: "" },
  client: { name: "", title: "", company: "", noticeAddress: "" },
};
