"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Race } from "@prisma/client";

export type RaceTableProps = {
  races: Race[];
};

export default function RaceTable({ races }: RaceTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>レース名</TableCell>
            <TableCell>開始日</TableCell>
            <TableCell>終了日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races.map((race) => (
            <TableRow
              key={race.id}
              hover
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <TableCell>{race.name}</TableCell>
              <TableCell>{race.dateOfRaceBegin.toDateString()}</TableCell>
              <TableCell>{race.dateOfRaceEnd.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
