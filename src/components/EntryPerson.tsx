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

interface EntryPersonProps {
  register: any; // react-hook-form の useForm() が返す register 関数
  errors: FieldErrors<FieldValues>; // react-hook-form の useForm() が返す errors
  control: any; // react-hook-form の useForm() が返す control オブジェクト
  roleName: string; // 'skipper' | 'crew1' | 'crew2'
  required: boolean;
}

export default function EntryPerson({
  register,
  errors,
  control,
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
        registerOptions={{
          validate: validateAlphabets,
          required: required ? "必須項目です" : undefined,
        }}
        label="姓（ローマ字）"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_firstNameRomaji`}
        registerOptions={{
          validate: validateAlphabets,
          required: required ? "必須項目です" : undefined,
        }}
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
        registerOptions={{ setValueAs: (value: string) => value === "yes" }}
        label="JTA 会員"
        options={[
          { value: "yes", label: "はい" },
          { value: "no", label: "いいえ" },
        ]}
      />
      <DatePicker
        control={control}
        registerName={`${roleName}_birthDay`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="生年月日"
      />
      <Select
        register={register}
        errors={errors}
        registerName={`${roleName}_sex`}
        label="性別"
        options={[
          { value: "male", label: "男性" },
          { value: "female", label: "女性" },
        ]}
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_address`}
        registerOptions={required ? { required: "必須項目です" } : {}}
        label="住所"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_eMail`}
        registerOptions={{
          validate: validateEmail,
          required: required ? "必須項目です" : undefined,
        }}
        label="メールアドレス"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_phone`}
        registerOptions={{
          validate: validatePhoneNumber,
          required: required ? "必須項目です" : undefined,
        }}
        label="電話番号"
      />
      <TextField
        register={register}
        errors={errors}
        registerName={`${roleName}_fax`}
        registerOptions={{
          validate: validatePhoneNumber,
        }}
        label="FAX"
      />
    </Stack>
  );
}
