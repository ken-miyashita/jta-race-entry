import { Dayjs } from "dayjs";
import { EntryTeamFormData } from "./types";

export function sanitizeFormData(
  formData: EntryTeamFormData
): EntryTeamFormData {
  return {
    ...formData,
    sailNumber: sanitizeString(formData.sailNumber),

    skipper_jsafId: sanitizeString(formData.skipper_jsafId),
    skipper_birthDay: sanitizeDay(formData.skipper_birthDay),
    skipper_eMail: sanitizeString(formData.skipper_eMail),
    skipper_phone: sanitizeString(formData.skipper_phone),
    skipper_fax: sanitizeString(formData.skipper_fax),

    crew1_jsafId: sanitizeString(formData.crew1_jsafId),
    crew1_birthDay: sanitizeDay(formData.crew1_birthDay),
    crew1_eMail: sanitizeString(formData.crew1_eMail),
    crew1_phone: sanitizeString(formData.crew1_phone),
    crew1_fax: sanitizeString(formData.crew1_fax),

    crew2_jsafId: sanitizeString(formData.crew2_jsafId),
    crew2_birthDay: sanitizeDay(formData.crew2_birthDay),
    crew2_eMail: sanitizeString(formData.crew2_eMail),
    crew2_phone: sanitizeString(formData.crew2_phone),
    crew2_fax: sanitizeString(formData.crew2_fax),
  };
}

// 文字列を整形する
// - 全角文字を半角文字に変換
function sanitizeString(value: string): string {
  return value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}

// 日付を YYYY-MM-DD の形式の文字列もしくは undefined に変換する
function sanitizeDay(day: Dayjs | string | undefined): string | undefined {
  if (!day) {
    return undefined;
  } else {
    return typeof day === "string" ? day : day.format("YYYY-MM-DD");
  }
}
