import { Dayjs } from "dayjs";
import { EntryTeamFormData } from "./types";

// フォームデータを整形する
export function sanitizeFormData(
  formData: EntryTeamFormData
): EntryTeamFormData {
  return {
    ...formData,
    sailNumber: sanitizeString(formData.sailNumber),
    boatWeight: sanitizeNumber(formData.boatWeight),

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

// 全角文字を半角文字に変換する
export function sanitizeZenkaku(value: string): string {
  return value
    .replace(/[\uff01-\uff5e]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
    })
    .replace(/\u3000/g, " ");
}

// 文字列を整形する
// - 全角文字を半角文字に変換
export function sanitizeString(value: string): string {
  return sanitizeZenkaku(value);
}

// 日付を YYYY-MM-DD の形式の文字列もしくは undefined に変換する
export function sanitizeDay(
  day: Dayjs | string | undefined
): string | undefined {
  if (!day) {
    return undefined;
  } else {
    return typeof day === "string" ? day : day.format("YYYY-MM-DD");
  }
}

// 数値を整形する
// - 全角文字を半角文字に変換
// - 数値以外の文字の場合は 0 に変換
export function sanitizeNumber(value: string | number): number {
  if (typeof value === "string") {
    const numString = sanitizeZenkaku(value);
    const num = parseFloat(numString);
    return isNaN(num) ? 0 : num;
  } else {
    return value;
  }
}
