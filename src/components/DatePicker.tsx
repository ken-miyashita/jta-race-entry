"use client";

import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

export type DatePickerProps = {
  control: any; // react-hook-form の useForm() が返す control オブジェクト
  registerName: string; // react-hook-form の useForm() が返す register 関数の引数 e.g. 'birthday'
  label: string; // e.g. '生年月日'
};

export default function DatePicker({
  control,
  registerName,
  label,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={registerName}
        render={({ field }) => (
          <MuiDatePicker
            label={label}
            value={field.value}
            inputRef={field.ref}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />
    </LocalizationProvider>
  );
}
