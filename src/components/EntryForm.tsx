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
import {
  FormControl,
  InputLabel,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";

import TextField from "../components/TextField";

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
          propsByReactHookForm={register("sailNumber", {
            validate: (value) => {
              if (value.length !== 4) {
                return "セール番号は4文字で入力してください";
              }
              return true;
            },
          })}
          label="セール番号"
          attributeName="sailNumber"
          errors={errors}
        />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="country-label">国</InputLabel>
          <Select
            {...register("country")}
            native
            label="国"
            error={!!errors.country}
          >
            <option value="JPN">日本</option>
            <option value="USA">アメリカ</option>
            <option value="AUS">オーストラリア</option>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          登録
        </Button>
      </Stack>
    </div>
  );
}
