"use client";

import TextField from "./TextField";
import Select from "./Select";

import type { FieldErrors, FieldValues } from "react-hook-form";
import { Stack } from "@mui/material";

interface EntryPersonProps {
  register: any; // react-hook-form の useForm() が返す register 関数
  errors: FieldErrors<FieldValues>; // react-hook-form の useForm() が返す errors

  roleName: string; // 'skipper' | 'crew1' | 'crew2'
  required: boolean;
}

export default function EntryPerson({
  register,
  errors,
  roleName,
  required,
}: EntryPersonProps) {
  return (
    <Stack component="div" spacing={2} sx={{ m: 2, width: "25ch" }}>
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_lastName`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="姓"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_firstName`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="名"
      />
    </Stack>
  );
}
