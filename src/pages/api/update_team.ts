import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { EditTeamFormData, EditPersonFormData } from "../../lib/types";

// POST /api/update_team
// Required fields in body: {formData}
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData = req.body;
  try {
    const extractedTeam = extractTeamFromFormData(formData);
    const extractedSkipper = extractPersonFromFormData(
      formData.skipper,
      "skipper"
    );
    const extractedCrew1 = extractPersonFromFormData(formData.crew1, "crew1");
    const extractedCrew2 = extractPersonFromFormData(formData.crew2, "crew2");

    const resultTeam = await prisma.team.update({
      data: extractedTeam,
      where: { id: formData.id },
    });
    const resultSkipper = await prisma.person.update({
      data: extractedSkipper,
      where: { id: formData.skipper.id },
    });
    const resultCrew1 = await prisma.person.update({
      data: extractedCrew1,
      where: { id: formData.crew1.id },
    });
    const resultCrew2 = extractedCrew2
      ? await prisma.person.update({
          data: extractedCrew2,
          where: { id: formData.crew2.id },
        })
      : {};
    return res
      .status(201)
      .json({ resultTeam, resultSkipper, resultCrew1, resultCrew2 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

function extractTeamFromFormData(
  formData: EditTeamFormData
): Prisma.TeamCreateInput {
  const {
    id, // prisma.team.update() の data に渡すときには id は不要
    createdAt, // prisma.team.update() の data に渡すときには createdAt は不要
    raceId, // prisma.team.update() の data に渡すときには raceId は不要で race を connect する
    skipper, // TeamFormData でのみ存在
    crew1, // TeamFormData でのみ存在
    crew2, // TeamFormData でのみ存在
    isCrew2Valid, // TeamFormData でのみ存在
    ...rest
  } = formData;
  return {
    ...rest,
    miscInJson: "",
    race: { connect: { id: raceId } },
  };
}

function extractPersonFromFormData(
  formData: EditPersonFormData,
  role: string
): any {
  if (!formData) return undefined;
  const {
    id, // prisma.person.update() の data に渡すときには id は不要
    createdAt, // prisma.person.update() の data に渡すときには createdAt は不要
    teamId, // prisma.person.update() の data に渡すときには teamId は不要で team を connect する
    ...rest
  } = formData;
  return {
    ...rest,
    role,
    miscInJson: "",
    team: { connect: { id: teamId } },
  };
}
