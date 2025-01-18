import React from "react";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";

type PageParams = {
  raceId: number;
};

export default async function Race(props: { params: Promise<PageParams> }) {
  const params = await props.params;
  const raceId = Number(params.raceId);

  const race = await prisma.race.findUnique({
    where: { id: raceId },
  });

  if (!race) notFound();

  return (
    <div>
      <h1>{race.name}</h1>
    </div>
  );
}
