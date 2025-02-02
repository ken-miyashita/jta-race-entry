import React from "react";
import prisma from "../../../lib/prisma";
import NewRaceForm from "../../../components/NewRaceForm";

export default async function NewRace() {
  return (
    <div>
      <h1>新規レース作成</h1>
      <NewRaceForm />
    </div>
  );
}
