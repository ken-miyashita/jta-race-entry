"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import * as React from "react";
import { Button, Stack, FormControlLabel, Checkbox } from "@mui/material";

import TextField from "./TextField";
import Select from "./Select";
import { countries } from "../lib/country";

import { validatePositiveNumber, validateSailNumber } from "../lib/validate";
import NewPerson from "./NewPerson";

import type { TeamFormData } from "../lib/types";
import { sanitizeFormData } from "../lib/sanitize";

export type NewTeamFormProps = {
  raceId: number;
};

import "dayjs/locale/ja";

export default function NewTeamForm({ raceId }: NewTeamFormProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    defaultValues: {
      country: "JPN",
    },
  });

  const [isCrew2Valid, setIsCrew2Valid] = React.useState<boolean>(false);
  const handleCrew2Valid = () => {
    setIsCrew2Valid(!isCrew2Valid);
  };
  const onSubmit: SubmitHandler<TeamFormData> = async (formData) => {
    try {
      const sanitizedFormData = sanitizeFormData(formData, isCrew2Valid);
      const body = { raceId, ...sanitizedFormData };
      await fetch(`/api/new_team`, {
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
        <NewPerson
          register={register}
          errors={errors}
          control={control}
          roleName="skipper"
          required
        />
        <h3>クルー１</h3>
        <NewPerson
          register={register}
          errors={errors}
          control={control}
          roleName="crew1"
          required
        />
        <h3>クルー２（オプション）</h3>
        <FormControlLabel
          control={
            <Checkbox checked={isCrew2Valid} onChange={handleCrew2Valid} />
          }
          label="クルー２を登録"
        />
        {isCrew2Valid && (
          <NewPerson
            register={register}
            errors={errors}
            control={control}
            roleName="crew2"
            required
          />
        )}
        <Button variant="contained" type="submit">
          登録
        </Button>
      </Stack>
    </div>
  );
}
