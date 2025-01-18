import React from "react";
import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";

export default async function ListEntry(props: {
  params: Promise<{ raceId: number }>;
}) {
  const params = await props.params;
  // const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // const post = await prisma.post.findUnique({
  //   where: { id },
  //   include: { author: true },
  // });

  // if (!post) notFound();

  return <p>RaceID is {params.raceId}</p>;
}
