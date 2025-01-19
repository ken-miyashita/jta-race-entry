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
          label="国"
          options={Object.entries(countries).map(([value, label]) => ({
            value,
            label,
          }))}
        />

        <Button variant="contained" type="submit">
          登録
        </Button>
      </Stack>
    </div>
  );
}
