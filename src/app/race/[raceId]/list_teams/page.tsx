import React from "react";
import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import TeamTable from "../../../../components/TeamTable";

type PageParams = {
  raceId: number;
};

export default async function ListTeams(props: {
  params: Promise<PageParams>;
}) {
  const params = await props.params;
  const raceId = Number(params.raceId);

  const race = await prisma.race.findUnique({
    where: { id: raceId },
  });

  if (!race) notFound();

  const teams = await prisma.team.findMany({
    where: { raceId },
    include: { persons: true },
  });

  return <TeamTable raceName={race.name} teams={teams} />;
}
