"use client";

import MuiTextField from "@mui/material/TextField";
import type { FieldErrors, FieldValues } from "react-hook-form";

export type TextFieldProps = {
  propsByReactHookForm: any;
  label: string; // e.g. 'セール番号'
  attributeName: string; // e.g. 'sailNumber'
  errors: FieldErrors<FieldValues>; // react-hook-form の useForm() が返す errors
};

export default function TextField({
  propsByReactHookForm,
  label,
  attributeName,
  errors,
}: TextFieldProps) {
  return (
    <MuiTextField
      {...propsByReactHookForm}
      label={label}
      error={!!errors[attributeName]}
      helperText={errors[attributeName]?.message}
    />
  );
}
