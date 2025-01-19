import type { Dayjs } from "dayjs";

export type EntryTeamFormData = {
  sailNumber: string;
  country: string;
  boatName?: string;
  boatWeight: number;
  fleet?: string;
  place?: string;
  message?: string;

  // Person のデータは skipper_xxx, crew1_xxx, crew2_xxx という形式の属性で保持する。
  // これは、react-hook-form の register() 関数に渡す name 属性として使うため。
  skipper_lastName: string;
  skipper_firstName: string;
  skipper_lastNameRomaji: string;
  skipper_firstNameRomaji: string;
  skipper_role: "skipper" | "crew1" | "crew2";
  skipper_jsafId?: string;
  skipper_jta: boolean;
  skipper_birthDay: string; // e.g. "2021-10-01"
  skipper_sex: "male" | "female";
  skipper_address: string;
  skipper_eMail: string;
  skipper_phone: string;
  skipper_fax?: string;

  crew1_lastName: string;
  crew1_firstName: string;
  crew1_lastNameRomaji: string;
  crew1_firstNameRomaji: string;
  crew1_role: "skipper" | "crew1" | "crew2";
  crew1_jsafId?: string;
  crew1_jta: boolean;
  crew1_birthDay: string; // e.g. "2021-10-01"
  crew1_sex: "male" | "female";
  crew1_address: string;
  crew1_eMail: string;
  crew1_phone: string;
  crew1_fax?: string;

  crew2_lastName: string;
  crew2_firstName: string;
  crew2_lastNameRomaji: string;
  crew2_firstNameRomaji: string;
  crew2_role: "skipper" | "crew1" | "crew2";
  crew2_jsafId?: string;
  crew2_jta: boolean;
  crew2_birthDay: string; // e.g. "2021-10-01"
  crew2_sex: "male" | "female";
  crew2_address: string;
  crew2_eMail: string;
  crew2_phone: string;
  crew2_fax?: string;
};
