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
  const { raceId, ...formData } = req.body;
  try {
    const extractedTeam = extractTeamFromFormData(formData);
    const extractedSkipper = extractPersonFromFormData(
      formData.skipper,
      "skipper"
    );
    const extractedCrew1 = extractPersonFromFormData(formData.crew1, "crew1");
    const extractedCrew2 = extractPersonFromFormData(formData.crew2, "crew2");

    console.log("extractedTeam = ", extractedTeam);
    console.log("extractedSkipper = ", extractedSkipper);
    console.log("extractedCrew1 = ", extractedCrew1);
    console.log("extractedCrew2 = ", extractedCrew2);

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
  const { skipper, crew1, crew2, isCrew2Valid, raceId, ...rest } = formData;
  return {
    ...rest,
    miscInJson: "",
    persons: {
      connect: [
        { id: (skipper as EditPersonFormData).id },
        { id: (crew1 as EditPersonFormData).id },
        ...(isCrew2Valid && crew2
          ? [{ id: (crew2 as EditPersonFormData).id }]
          : []),
      ],
    },
    race: { connect: { id: raceId } },
  };
}

function extractPersonFromFormData(
  formData: EditPersonFormData,
  role: string
): any {
  if (!formData) return undefined;
  return {
    ...formData,
    role,
    miscInJson: "",
  };
}
