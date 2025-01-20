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
            <TableCell>国コード</TableCell>
            <TableCell>艇名</TableCell>
            <TableCell>所属フリート</TableCell>
            <TableCell>活動海域</TableCell>
            <TableCell>スキッパー</TableCell>
            <TableCell>クルー１</TableCell>
            <TableCell>クルー２</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => {
            const skipper = team.persons.find(
              (person) => person.role === "skipper"
            );
            const crew1 = team.persons.find(
              (person) => person.role === "crew1"
            );
            const crew2 = team.persons.find(
              (person) => person.role === "crew2"
            );
            return (
              <TableRow key={team.id}>
                <TableCell>{team.sailNumber}</TableCell>
                <TableCell>{team.country}</TableCell>
                <TableCell>{team.boatName}</TableCell>
                <TableCell>{team.fleet}</TableCell>
                <TableCell>{team.place}</TableCell>
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
