"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import * as React from "react";
import { Button, Stack } from "@mui/material";

import TextField from "./TextField";
import Select from "./Select";
import { countries } from "../lib/country";

import { validatePositiveNumber, validateSailNumber } from "../lib/validate";
import EntryPerson from "./EntryPerson";

import type { EntryTeamFormData } from "../lib/types";
import { sanitizeFormData } from "../lib/sanitize";

export type EntryTeamFormProps = {
  raceId: number;
};

import "dayjs/locale/ja";

export default function EntryTeamForm({ raceId }: EntryTeamFormProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryTeamFormData>({
    defaultValues: {
      country: "JPN",
    },
  });

  const onSubmit: SubmitHandler<EntryTeamFormData> = async (formData) => {
    try {
      const sanitizedFormData = sanitizeFormData(formData);
      const body = { raceId, ...sanitizedFormData };

      console.log(body);

      await fetch(`/api/new_entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    router.push(`/race/${raceId}`);
  };
  return (
    <div>
      <h2>エントリー入力</h2>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ m: 2, width: "25ch" }}
      >
        <TextField
          register={register}
          errors={errors}
          registerName="sailNumber"
          registerOptions={{
            required: "セール番号を入力してください",
            validate: validateSailNumber,
          }}
          label="セール番号"
        />
        <Select
          register={register}
          errors={errors}
          registerName="country"
          label="国コード"
          options={Object.entries(countries).map(([value, label]) => ({
            value,
            label,
          }))}
        />
        <TextField
          register={register}
          errors={errors}
          registerName="boatName"
          label="艇名"
        />
        <TextField
          register={register}
          errors={errors}
          registerName="boatWeight"
          registerOptions={{
            required: "ハル重量を入力してください",
            validate: validatePositiveNumber,
          }}
          label="ハル重量（キログラム）"
        />
        <TextField
          register={register}
          errors={errors}
          registerName="fleet"
          label="所属フリート"
        />
        <TextField
          register={register}
          errors={errors}
          registerName="place"
          label="活動海域"
        />
        <TextField
          register={register}
          errors={errors}
          registerName="message"
          label="連絡事項"
        />
        <h3>スキッパー</h3>
        <EntryPerson
          register={register}
          errors={errors}
          control={control}
          roleName="skipper"
          required
        />
        <h3>クルー１</h3>
        <EntryPerson
          register={register}
          errors={errors}
          control={control}
          roleName="crew1"
          required
        />
        <h3>クルー２（オプション）</h3>
        <EntryPerson
          register={register}
          errors={errors}
          control={control}
          roleName="crew2"
          required={false}
        />
        <Button variant="contained" type="submit">
          登録
        </Button>
      </Stack>
    </div>
  );
}
