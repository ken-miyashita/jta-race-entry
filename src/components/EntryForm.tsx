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

// const validationRules = {
//   sailNumber: {
//     required: "セール番号を入力してください",
//     maxLength: 4,
//   },
//   country: {
//     required: "国を選択してください",
//   },
//   boatWeight: {
//     required: "ボート重量を入力してください（キログラた単位）",
//   },
// };

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

  // const foo = register("sailNumber", {
  //   required: "セール番号を入力してください",
  //   maxLength: 4,
  // });
  // console.log(foo);

  return (
    <div>
      <h2>エントリー入力</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("sailNumber", {
            validate: (value) => {
              console.log("valudate called");
              if (value.length !== 4) {
                return "セール番号は4文字で入力してください";
              }
              return true;
            },
          })}
          label="セール番号"
          error={!!errors.sailNumber}
          helperText={errors.sailNumber?.message}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
