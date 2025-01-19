import type { NextApiRequest, NextApiResponse } from "next";
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

  //   const result = await prisma.post.create({
  //     data: {
  //       title: title,
  //       content: content,
  //       author: { connect: { email: authorEmail } },
  //     },
  //   });
  return res.status(201).json(true);
}
