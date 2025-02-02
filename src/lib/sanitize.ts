import { Dayjs } from "dayjs";
import { TeamFormData, NewRaceFormData, PersonFormData } from "./types";

// フォームデータを整形する
export function sanitizeTeamFormData(formData: TeamFormData): TeamFormData {
  if (!formData.isCrew2Valid) {
    formData.crew2 = undefined;
  }
  return {
    ...formData,
    sailNumber: sanitizeString(formData.sailNumber),
    boatWeight: sanitizeNumber(formData.boatWeight),
    skipper: sanitizePersonFormData(formData.skipper),
    crew1: sanitizePersonFormData(formData.crew1),
    crew2: formData.crew2 ? sanitizePersonFormData(formData.crew2) : undefined,
  };
}

function sanitizePersonFormData(formData: PersonFormData): PersonFormData {
  return {
    ...formData,
    lastName: sanitizeString(formData.lastName),
    firstName: sanitizeString(formData.firstName),
    lastNameRomaji: sanitizeString(formData.lastNameRomaji),
    firstNameRomaji: sanitizeString(formData.firstNameRomaji),
    jsafId: sanitizeString(formData.jsafId),
    birthDay: sanitizeDate(formData.birthDay),
    sex: sanitizeString(formData.sex),
    address: sanitizeString(formData.address),
    eMail: sanitizeString(formData.eMail),
    phone: sanitizeString(formData.phone),
    fax: sanitizeString(formData.fax),
  };
}

export function sanitizeRaceFormData(
  formData: NewRaceFormData
): NewRaceFormData {
  return {
    ...formData,
    name: sanitizeString(formData.name),
    mailFrom: sanitizeString(formData.mailFrom),
    mailBcc: sanitizeString(formData.mailBcc),
    startDate: sanitizeDate(formData.startDate),
    endDate: sanitizeDate(formData.endDate),
  };
}

// 全角文字を半角文字に変換する
export function sanitizeZenkaku(value: string): string {
  return value
    .replace(/[\uff01-\uff5e]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
    }) // アルファベット、数字、記号
    .replace(/[\u2010-\u2015ー]/g, "-") // さまざまなハイフン
    .replace(/\u3000/g, " "); // 空白
}

// 文字列を整形する
// - 全角文字を半角文字に変換
export function sanitizeString(value: string): string {
  return sanitizeZenkaku(value);
}

// 日付を YYYY-MM-DD の形式の文字列もしくは空文字列に変換する
export function sanitizeDate(date: Dayjs | string | null | undefined): string {
  if (!date) {
    return "";
  } else {
    return typeof date === "string" ? date : date.format("YYYY-MM-DD");
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
