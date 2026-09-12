export interface PartyInfo {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
}

export interface DPAData {
  purpose: string;
  effectiveDate: string;
  termMonths: number;
  termAutoRenew: boolean;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  company: PartyInfo;
  designPartner: PartyInfo;
}

export const defaultDPAData: DPAData = {
  purpose: "Participating in a design partner program to provide product feedback.",
  effectiveDate: new Date().toISOString().split("T")[0],
  termMonths: 12,
  termAutoRenew: true,
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  company: { name: "", title: "", company: "", noticeAddress: "" },
  designPartner: { name: "", title: "", company: "", noticeAddress: "" },
};
