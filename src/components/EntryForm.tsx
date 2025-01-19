"use client";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";

import type { Race } from "@prisma/client";

export type EntryFormProps = {
  raceId: number;
};

interface EntryFormData {
  sailNumber: string;
  country: "JPN" | "USA" | "AUS";
  boatName?: string;
  boatWeight: number;
}

const validationRules = {
  sailNumber: {
    required: "セール番号を入力してください",
    maxLength: 4,
  },
  country: {
    required: "国を選択してください",
  },
  boatWeight: {
    required: "ボート重量を入力してください（キログラた単位）",
  },
};

export default function EntryForm({ raceId }: EntryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EntryFormData>({
    defaultValues: {
      country: "JPN",
    },
  });

  const onSubmit: SubmitHandler<EntryFormData> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("sailNumber", { required: true })} />
      {errors.sailNumber && <span>セール番号を入力してください</span>}
      <input type="submit" />
    </form>
  );
  /*
  return (
    <div>
      <h2>エントリー入力</h2>
      <Stack
        // component={}
        // noValidate
        // onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ m: 2, width: "25ch" }}
      >
        <Controller
          name="sailNumber"
          control={control}
          rules={validationRules.sailNumber}
          render={({ field }) => (
            <TextField
              {...field}
              label="セール番号"
              type="text"
              error={errors.sailNumber !== undefined}
              helperText={errors.sailNumber?.message}
            />
          )}
        />
        <Controller
          name="country"
          control={control}
          rules={validationRules.country}
          render={({ field }) => (
            <Select
              {...field}
              native
              label="国"
              error={errors.country !== undefined}
            >
              <option value="JPN">日本</option>
              <option value="USA">アメリカ</option>
              <option value="AUS">オーストラリア</option>
            </Select>
          )}
        />
        <Button variant="contained" type="submit">
          送信する
        </Button>
      </Stack>
    </div>
  );
  */
}
