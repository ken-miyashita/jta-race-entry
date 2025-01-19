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
  /*
  // こっちは動作する
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("sailNumber", { required: true })} />
      {errors.sailNumber && <span>セール番号を入力してください</span>}
      <input type="submit" />
    </form>
  );
  */

  return (
    <div>
      <h2>エントリー入力</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("sailNumber", {
            required: validationRules.sailNumber.required,
            maxLength: validationRules.sailNumber.maxLength,
          })}
          label="セール番号"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
