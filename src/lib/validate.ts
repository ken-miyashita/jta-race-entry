export function validateSailNumber(value: string) {
  if (value.length > 4) {
    return "セール番号は4桁以下で入力してください";
  }
  return true;
}
