"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Team, Person } from "@prisma/client";

type TeamWithPersons = Team & {
  persons: Person[];
};

export type TeamTableProps = {
  teams: TeamWithPersons[];
};

export default function TeamTable({ teams }: TeamTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>セール番号</TableCell>
            <TableCell>スキッパー</TableCell>
            <TableCell>クルー１</TableCell>
            <TableCell>クルー２</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => {
            const skipper = team.persons.find((person) => person.role === 0);
            const crew1 = team.persons.find((person) => person.role === 1);
            const crew2 = team.persons.find((person) => person.role === 2);
            return (
              <TableRow key={team.id}>
                <TableCell>{team.sailNumber}</TableCell>
                <TableCell>
                  {skipper?.lastName} {skipper?.firstName}
                </TableCell>
                <TableCell>
                  {crew1?.lastName} {crew1?.firstName}
                </TableCell>
                <TableCell>
                  {crew2?.lastName} {crew2?.firstName}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
