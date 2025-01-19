import React from "react";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import TeamTable from "../../../components/TeamTable";
import Link from "next/link";

type PageParams = {
  raceId: number;
};

export default async function Race(props: { params: Promise<PageParams> }) {
  const params = await props.params;
  const raceId = Number(params.raceId);

  const race = await prisma.race.findUnique({
    where: { id: raceId },
    include: { teams: true },
  });

  if (!race) notFound();

  return (
    <div>
      <h1>{race.name}</h1>
      <Link href={`/race/${raceId}/list_entries`}>List Entries</Link>
      <br></br>
      <Link href={`/race/${raceId}/new_entry`}>New Entry</Link>
    </div>
  );
}