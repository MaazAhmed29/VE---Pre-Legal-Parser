export interface PartyInfo {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
}

export interface CSAData {
  purpose: string;
  effectiveDate: string;
  subscriptionTermMonths: number;
  subscriptionAutoRenew: boolean;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  provider: PartyInfo;
  customer: PartyInfo;
}

export const defaultCSAData: CSAData = {
  purpose: "Providing and receiving cloud software services.",
  effectiveDate: new Date().toISOString().split("T")[0],
  subscriptionTermMonths: 12,
  subscriptionAutoRenew: true,
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  provider: { name: "", title: "", company: "", noticeAddress: "" },
  customer: { name: "", title: "", company: "", noticeAddress: "" },
};
