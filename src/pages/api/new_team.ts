import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { PersonFormData, TeamFormData } from "../../lib/types";

// POST /api/new_team
// Required fields in body: {raceId, ...formData}
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { raceId, ...formData } = req.body;
  try {
    const extractedTeam = extractTeamFromFormData(formData, raceId);
    const result = await prisma.team.create({
      data: extractedTeam,
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

function extractTeamFromFormData(
  formData: TeamFormData,
  raceId: number
): Prisma.TeamCreateInput {
  const { skipper, crew1, crew2, isCrew2Valid, ...rest } = formData;
  return {
    ...rest,
    miscInJson: "",
    persons: {
      create: [
        extractPersonFromFormData(skipper, "skipper"),
        extractPersonFromFormData(crew1, "crew1"),
        ...(isCrew2Valid && crew2
          ? [extractPersonFromFormData(crew2!, "crew2")]
          : []),
      ],
    },
    race: { connect: { id: raceId } },
  };
}

function extractPersonFromFormData(
  formData: PersonFormData,
  role: string
): any {
  return {
    ...formData,
    role,
    miscInJson: "",
  };
}
