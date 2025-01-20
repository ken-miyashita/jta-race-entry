export function validateSailNumber(value: string) {
  if (value.length > 4) {
    return "セール番号は4桁以下で入力してください";
  }
  return true;
}

export function validateNumber(value: string) {
  // 全角数字を半角数字に変換
  const numString = value.replace(/[０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  if (isNaN(Number(numString))) {
    return "数値を入力してください";
  }
  return true;
}
