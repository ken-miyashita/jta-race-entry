"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";

import type { FieldErrors, FieldValues } from "react-hook-form";

export type SelectProps = {
  register: any; // react-hook-form の useForm() が返す register 関数
  errors: FieldErrors<FieldValues>; // react-hook-form の useForm() が返す errors
  registerName: string; // react-hook-form の useForm() が返す register 関数の引数 e.g. 'country'
  registerOptions?: any; // react-hook-form の useForm() が返す register 関数の引数
  label: string; // e.g. '国'
  options: { value: string | number; label: string }[]; // e.g. [{ value: 'JPN', label: '日本' }, { value: 'USA', label: 'アメリカ' }]
};

export default function TextField({
  register,
  errors,
  registerName,
  registerOptions = {},
  label,
  options,
}: SelectProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="country-label">{label}</InputLabel>
      <MuiSelect
        {...register(registerName, registerOptions)}
        native
        label={label}
        error={!!errors[registerName]}
      >
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
