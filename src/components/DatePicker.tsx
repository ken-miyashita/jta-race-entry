"use client";

import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

export type DatePickerProps = {
  control: any; // react-hook-form の useForm() が返す control オブジェクト
  registerName: string; // react-hook-form の useForm() が返す register 関数の引数 e.g. 'birthDay'
  registerOptions?: any; // react-hook-form の useForm() が返す register 関数の引数
  label: string; // e.g. '生年月日'
};

export default function DatePicker({
  control,
  registerName,
  registerOptions = {},
  label,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={registerName}
        rules={registerOptions}
        render={({ field }) => (
          <MuiDatePicker
            label={label}
            // value が undefined だと MUI の DatePicker が uncontrolled モードになって
            // しまい都合が悪いので、無理やり null を渡すことで「日付は未定だけど controlled
            // モードで扱う」ことを表現している
            value={field.value ?? null}
            inputRef={field.ref}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />
    </LocalizationProvider>
  );
}
