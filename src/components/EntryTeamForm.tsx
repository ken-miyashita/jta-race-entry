"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import * as React from "react";
import { Button, Stack } from "@mui/material";

import TextField from "./TextField";
import Select from "./Select";
import { countries } from "../lib/country";

import type { Race } from "@prisma/client";
import { validateSailNumber } from "../lib/validate";
import EntryPerson from "./EntryPerson";

export type EntryTeamFormProps = {
  raceId: number;
};

interface EntryTeamFormData {
  sailNumber: string;
  country: string;
  boatName?: string;
  boatWeight: number;
  fleet?: string;
  place?: string;
  message?: string;

  skipper_lastName: string;
  skipper_firstName: string;

  crew1_lastName: string;
  crew1_firstName: string;

  crew2_lastName?: string;
  crew2_firstName?: string;
}

export default function EntryTeamForm({ raceId }: EntryTeamFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryTeamFormData>({
    defaultValues: {
      country: "JPN",
    },
  });

  const onSubmit: SubmitHandler<EntryTeamFormData> = (data) =>
    console.log(data);

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
        <EntryPerson
          register={register}
          errors={errors}
          roleName="skipper"
          required
        />
        <EntryPerson
          register={register}
          errors={errors}
          roleName="crew1"
          required
        />
        <EntryPerson
          register={register}
          errors={errors}
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