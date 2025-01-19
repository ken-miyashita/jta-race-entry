import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

// POST /api/new_entry
// Required fields in body: {raceId, ...entryTeamFormData}
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { raceId, ...formData } = req.body;
  console.log(raceId);
  console.log(formData);

  const result = await prisma.team.create({
    data: extractTeamFromFormData(formData, raceId),
  });
  return res.status(201).json(result);
}

function extractTeamFromFormData(
  formData: any,
  raceId: number
): Prisma.TeamCreateInput {
  return {
    sailNumber: formData.sailNumber,
    country: formData.country,
    boatName: formData.boatName,
    boatWeight: formData.boatWeight,
    fleet: formData.fleet,
    place: formData.place,
    message: formData.message,
    miscInJson: formData.miscInJson,
    persons: {
      create: [
        extractPersonFromFormData(formData, "skipper"),
        extractPersonFromFormData(formData, "crew1"),
        extractPersonFromFormData(formData, "crew2"),
      ],
    },
    race: { connect: { id: raceId } },
  };
}

function extractPersonFromFormData(formData: any, role: string): any {
  const birtyDayString = formData[`${role}_birdyDay`];
  const birthDay = birtyDayString ? new Date(birtyDayString) : undefined;
  return {
    lastName: formData[`${role}_lastName`],
    firstName: formData[`${role}_firstName`],
    lastNameRomaji: formData[`${role}_lastNameRomaji`],
    firstNameRomaji: formData[`${role}_firstNameRomaji`],
    role: role,
    jsafId: formData[`${role}_jsafId`],
    jta: formData[`${role}_jta`],
    birthDay,
    sex: formData[`${role}_sex`],
    address: formData[`${role}_address`],
    eMail: formData[`${role}_eMail`],
    phone: formData[`${role}_phone`],
    fax: formData[`${role}_fax`],
    miscInJson: "",
  };
}
