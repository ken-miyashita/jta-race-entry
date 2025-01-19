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
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_lastNameRomaji`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="姓（ローマ字）"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_firstNameRomaji`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="名（ローマ字）"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_jsafId`}
        label="JSAF ID"
      />
      <Select
        register={register}
        errors={errors}
        registerName={`${roleName}_jta`}
        label="JTA 会員"
        options={[
          { value: "true", label: "はい" },
          { value: "false", label: "いいえ" },
        ]}
      />
    </Stack>
  );
}
