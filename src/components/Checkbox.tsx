"use client";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";

export type CheckboxProps = {
  register: any; // react-hook-form の useForm() が返す register 関数
  registerName: string; // react-hook-form の useForm() が返す register 関数の引数 e.g. 'isCrew2Valid'
  registerOptions?: any; // react-hook-form の useForm() が返す register 関数の引数
  value: boolean; // チェックボックスの値
  label: string; // e.g. 'クルー２'
};

export default function Checkbox({
  register,
  registerName,
  registerOptions = {},
  value = false, // チェックボックスの値。undefined だと MuiCheckbox が uncontrolled モードになってしまうので、false を渡す
  label,
}: CheckboxProps) {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={value}
          {...register(registerName, registerOptions)}
        />
      }
      label={label}
    />
  );
}
