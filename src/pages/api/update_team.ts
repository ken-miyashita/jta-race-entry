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
  const teamId = formData.id;
  try {
    const extractedTeam = extractTeamFromFormData(formData);
    const extractedSkipper = extractPersonFromFormData(
      formData.skipper,
      teamId,
      "skipper"
    );
    const extractedCrew1 = extractPersonFromFormData(
      formData.crew1,
      teamId,
      "crew1"
    );
    const extractedCrew2 = extractPersonFromFormData(
      formData.crew2,
      teamId,
      "crew2"
    );

    const resultTeam = await prisma.team.update({
      data: extractedTeam,
      where: { id: teamId },
    });
    const resultSkipper = await prisma.person.update({
      data: extractedSkipper,
      where: { id: formData.skipper.id },
    });
    const resultCrew1 = await prisma.person.update({
      data: extractedCrew1,
      where: { id: formData.crew1.id },
    });
    let resultCrew2;
    if (formData.isCrew2Valid) {
      if (formData.crew2.id) {
        // 既存の crew2 を更新する
        resultCrew2 = await prisma.person.update({
          data: extractedCrew2,
          where: { id: formData.crew2.id },
        });
      } else {
        // 新規に crew2 を作る
        resultCrew2 = await prisma.person.create({
          data: extractedCrew2,
        });
      }
    } else {
      // チェックボックスで crew2 を無効にした場合は、既存の crew2 を削除する
      resultCrew2 = await prisma.person.deleteMany({
        where: { teamId: teamId, role: "crew2" },
      });
    }

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
  teamId: number,
  role: string
): any {
  if (!formData) return undefined;
  const {
    id, // prisma.person.update() の data に渡すときには id は不要
    createdAt, // prisma.person.update() の data に渡すときには createdAt は不要
    teamId: teamIdInPersonFormData, // 新規に crew2 を作ったときには teamId がここでは指定されていないので引数として渡す
    ...rest
  } = formData;
  return {
    ...rest,
    role,
    miscInJson: "",
    team: { connect: { id: teamId } },
  };
}
