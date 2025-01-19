"use client";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import * as React from "react";
import { Button, Stack } from "@mui/material";

import TextField from "../components/TextField";
import Select from "../components/Select";
import { countries } from "../lib/country";

import type { Race } from "@prisma/client";
import { validateSailNumber } from "../lib/validate";

export type EntryFormProps = {
  raceId: number;
};

interface EntryFormData {
  sailNumber: string;
  country: string;
  boatName?: string;
  boatWeight: number;
  fleet?: string;
  place?: string;
  message?: string;
}

export default function EntryForm({ raceId }: EntryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryFormData>({
    defaultValues: {
      country: "JPN",
    },
  });

  const onSubmit: SubmitHandler<EntryFormData> = (data) => console.log(data);

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
            valueAsNumber: true,
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

        <Button variant="contained" type="submit">
          登録
        </Button>
      </Stack>
    </div>
  );
}
