"use client";

import { useForm } from "react-hook-form";

import * as React from "react";
import { Button, Stack, FormControlLabel, Checkbox } from "@mui/material";

import PersonForm from "./PersonForm";
import TextField from "./TextField";
import Select from "./Select";
import { countries } from "../lib/country";

import { validatePositiveNumber, validateSailNumber } from "../lib/validate";

import type { TeamFormData } from "../lib/types";

import "dayjs/locale/ja";

export type TeamFormProps = {
  initialFormData?: TeamFormData;
  onSubmit: (formData: TeamFormData) => void;
};

export default function TeamForm({ initialFormData, onSubmit }: TeamFormProps) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    defaultValues: {
      country: "JPN",
      ...initialFormData,
    },
  });

  // チェックボックスの値を監視して、crew2 用の UI を表示するかどうかを決める。
  const isCrew2Valid = watch("isCrew2Valid");

  return (
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
      <PersonForm
        register={register}
        errors={errors}
        control={control}
        roleName="skipper"
        required
      />
      <h3>クルー１</h3>
      <PersonForm
        register={register}
        errors={errors}
        control={control}
        roleName="crew1"
        required
      />
      <h3>クルー２（オプション）</h3>
      <FormControlLabel
        control={<Checkbox {...register("isCrew2Valid")} />}
        label="クルー２"
      />
      {isCrew2Valid && (
        <PersonForm
          register={register}
          errors={errors}
          control={control}
          roleName="crew2"
          required
        />
      )}
      <Button variant="contained" type="submit">
        {initialFormData ? "更新" : "登録"}
      </Button>
    </Stack>
  );
}
