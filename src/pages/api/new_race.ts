import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import type { NewRaceFormData } from "../../lib/types";
import { Prisma } from "@prisma/client";

// POST /api/new_race
// Required fields in body: {name, mailFrom, mailBcc, dateOfRaceBegin, dateOfRaceEnd}
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const extractedRace = extractRaceFromFormData(req.body);
    const result = await prisma.race.create({
      data: extractedRace,
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

function extractRaceFromFormData(formData: any): Prisma.RaceCreateInput {
  return {
    name: formData.name,
    mailFrom: formData.mailFrom,
    mailBcc: formData.mailBcc,
    startDate: formData.startDate,
    endDate: formData.endDate,
    miscInJson: "",
  };
}
