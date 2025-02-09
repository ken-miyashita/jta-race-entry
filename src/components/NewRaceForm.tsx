"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import * as React from "react";
import { Button, Stack } from "@mui/material";

import TextField from "./TextField";
import DatePicker from "./DatePicker";
import type { NewRaceFormData } from "../lib/types";
import { validateEmail } from "../lib/validate";
import { sanitizeRaceFormData } from "../lib/sanitize";
import { useAdmin } from "../lib/useAdmin";

export default function NewRaceForm() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState<boolean | undefined>(undefined);
  useAdmin(setIsAdmin);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRaceFormData>();

  const onSubmit: SubmitHandler<NewRaceFormData> = async (formData) => {
    try {
      const sanitizedFormData = sanitizeRaceFormData(formData);
      await fetch(`/api/new_race`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedFormData),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (isAdmin === undefined) {
    return <p></p>;
  } else if (!isAdmin) {
    return <p>このページは管理者のみが閲覧できます。</p>;
  }

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={{ m: 2, width: "25ch" }}
    >
      <h1>新規レース作成</h1>
      <TextField
        register={register}
        errors={errors}
        registerName="name"
        registerOptions={{
          required: "レース名を入力してください",
        }}
        label="レース名"
      />

      <DatePicker
        control={control}
        registerName="startDate"
        registerOptions={{
          required: "開始日を入力してください",
        }}
        label="開始日"
      />
      <DatePicker
        control={control}
        registerName="endDate"
        registerOptions={{
          required: "終了日を入力してください",
        }}
        label="終了日"
      />
      <TextField
        register={register}
        errors={errors}
        registerName="mailFrom"
        registerOptions={{
          validate: validateEmail,
          required: "通知メールの From 欄を入力してください",
        }}
        label="通知メールの From 欄"
      />
      <TextField
        register={register}
        errors={errors}
        registerName="mailBcc"
        registerOptions={{
          validate: validateEmail,
          required: "通知メールの Bcc 欄を入力してください",
        }}
        label="通知メールの Bcc 欄"
      />
      <Button type="submit" variant="contained">
        作成
      </Button>
    </Stack>
  );
}
