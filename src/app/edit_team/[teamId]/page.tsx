import React from "react";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import EditTeamForm from "../../../components/EditTeamForm";
import { EditTeamFormData } from "../../../lib/types";
import { Person, Team } from "@prisma/client";

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
  const initialFormData = convertTeamToFormData(team);

  return (
    <div>
      <EditTeamForm initialFormData={initialFormData} />
    </div>
  );
}

function convertTeamToFormData(
  team: Team & { persons: Person[] }
): EditTeamFormData {
  const { persons, ...rest } = team;
  const skipper = persons.find((p) => p.role === "skipper")!;
  const crew1 = persons.find((p) => p.role === "crew1")!;
  const crew2 = persons.find((p) => p.role === "crew2");
  const isCrew2Valid = !!crew2;
  const createdAt = team.createdAt.toISOString();
  return {
    ...rest,
    createdAt,
    skipper,
    crew1,
    crew2,
    isCrew2Valid,
  };
}
