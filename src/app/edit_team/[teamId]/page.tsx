import React from "react";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import EditTeamForm from "../../../components/EditTeamForm";

type PageParams = {
  teamId: number;
};

export default async function EditTeam(props: { params: Promise<PageParams> }) {
  const params = await props.params;
  const teamId = Number(params.teamId);

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: { persons: true },
  });

  if (!team) notFound();

  return (
    <div>
      <EditTeamForm team={team} />
    </div>
  );
}
