export interface PartyInfo {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
}

export interface SLAData {
  licenseScope: string;
  effectiveDate: string;
  termMonths: number;
  termAutoRenew: boolean;
  fees: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  licensor: PartyInfo;
  licensee: PartyInfo;
}

export const defaultSLAData: SLAData = {
  licenseScope: "Internal business use of the Software as described in the Order Form.",
  effectiveDate: new Date().toISOString().split("T")[0],
  termMonths: 12,
  termAutoRenew: true,
  fees: "",
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  licensor: { name: "", title: "", company: "", noticeAddress: "" },
  licensee: { name: "", title: "", company: "", noticeAddress: "" },
};
