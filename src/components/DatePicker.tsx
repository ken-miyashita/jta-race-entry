"use client";

import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { FieldErrors, FieldValues } from "react-hook-form";

export type DatePickerProps = {
  register: any; // react-hook-form の useForm() が返す register 関数
  errors: FieldErrors<FieldValues>; // react-hook-form の useForm() が返す errors
  registerName: string; // react-hook-form の useForm() が返す register 関数の引数 e.g. 'birthday'
  registerOptions?: any; // react-hook-form の useForm() が返す register 関数の引数
  label: string; // e.g. '生年月日'
};

export default function DatePicker({
  register,
  errors,
  registerName,
  registerOptions = {},
  label,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        {...register(registerName, registerOptions)}
        label={label}
        error={!!errors[registerName]}
        helperText={errors[registerName]?.message}
        // たぶん違う。。。
        name={label}
      />
    </LocalizationProvider>
  );
}
