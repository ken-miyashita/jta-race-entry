"use client";

import TextField from "./TextField";
import Select from "./Select";

import type { FieldErrors, FieldValues } from "react-hook-form";
import { Stack } from "@mui/material";
import DatePicker from "./DatePicker";
import {
  validateAlphabets,
  validateEmail,
  validatePhoneNumber,
} from "../lib/validate";

interface PersonFormProps {
  register: any; // react-hook-form の useForm() が返す register 関数
  errors: FieldErrors<FieldValues>; // react-hook-form の useForm() が返す errors
  control: any; // react-hook-form の useForm() が返す control オブジェクト
  roleName: string; // 'skipper' | 'crew1' | 'crew2'
  required: boolean;
}

export default function PersonForm({
  register,
  errors,
  control,
  roleName,
  required,
}: PersonFormProps) {
  return (
    <Stack component="div" spacing={2} sx={{ m: 2, width: "25ch" }}>
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.lastName`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="姓"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.firstName`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="名"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.lastNameRomaji`}
        registerOptions={{
          validate: validateAlphabets,
          required: required ? "必須項目です" : undefined,
        }}
        label="姓（ローマ字）"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.firstNameRomaji`}
        registerOptions={{
          validate: validateAlphabets,
          required: required ? "必須項目です" : undefined,
        }}
        label="名（ローマ字）"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.jsafId`}
        label="JSAF ID"
      />
      <Select
        register={register}
        errors={errors}
        registerName={`${roleName}.jta`}
        registerOptions={{ setValueAs: (value: string) => value === "yes" }}
        label="JTA 会員"
        options={[
          { value: "yes", label: "はい" },
          { value: "no", label: "いいえ" },
        ]}
      />
      <DatePicker
        control={control}
        registerName={`${roleName}.birthDay`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="生年月日"
      />
      <Select
        register={register}
        errors={errors}
        registerName={`${roleName}.sex`}
        label="性別"
        options={[
          { value: "male", label: "男性" },
          { value: "female", label: "女性" },
        ]}
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.address`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="住所"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.eMail`}
        registerOptions={{
          validate: validateEmail,
          required: required ? "必須項目です" : undefined,
        }}
        label="メールアドレス"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.phone`}
        registerOptions={{
          validate: validatePhoneNumber,
          required: required ? "必須項目です" : undefined,
        }}
        label="電話番号"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}.fax`}
        registerOptions={{
          validate: validatePhoneNumber,
        }}
        label="FAX"
      />
    </Stack>
  );
}
