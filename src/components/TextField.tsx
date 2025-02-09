"use client";

import MuiTextField from "@mui/material/TextField";
import type { FieldErrors, FieldValues } from "react-hook-form";

export type TextFieldProps = {
  register: any; // react-hook-form の useForm() が返す register 関数
  errors: FieldErrors<FieldValues>; // react-hook-form の useForm() が返す errors
  registerName: string; // react-hook-form の useForm() が返す register 関数の引数 e.g. 'sailNumber'
  registerOptions?: any; // react-hook-form の useForm() が返す register 関数の引数
  label: string; // e.g. 'セール番号'
};

export default function TextField({
  register,
  errors,
  registerName,
  registerOptions = {},
  label,
}: TextFieldProps) {
  // ネストされたオブジェクトのエラーを取得するための処理
  // 例えば registerName が 'skipper.lastName' の場合、errors は { skipper: { lastName: { message: '必須項目です' } } } となる
  // この場合、error は { message: '必須項目です' } となる
  const registerNameArray = registerName.split(".");
  const error = registerNameArray.reduce((acc: any, curr: any) => {
    return acc?.[curr];
  }, errors);

  return (
    <MuiTextField
      {...register(registerName, registerOptions)}
      label={label}
      error={!!error}
      helperText={error?.["message"]}
    />
  );
}
