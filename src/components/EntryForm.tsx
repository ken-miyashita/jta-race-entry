"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Race } from "@prisma/client";

export type EntryFormProps = {
  raceId: number;
};

export default function EntryForm({ raceId }: EntryFormProps) {
  const router = useRouter();
  return (
    <div>
      <h2>エントリー入力</h2>
      <form>
        <label>
          セール番号
          <input type="text" name="sailNumber" />
        </label>
        <label>
          スキッパー
          <input type="text" name="skipper" />
        </label>
        <label>
          クルー１
          <input type="text" name="crew1" />
        </label>
        <label>
          クルー２
          <input type="text" name="crew2" />
        </label>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
