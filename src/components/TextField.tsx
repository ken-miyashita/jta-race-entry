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
  return (
    <MuiTextField
      {...register(registerName, registerOptions)}
      label={label}
      error={!!errors[registerName]}
      helperText={errors[registerName]?.message}
    />
  );
}
