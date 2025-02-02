import prisma from "../../lib/prisma";
import RaceTable from "../../components/RaceTable";

export default async function ListRaces() {
  const races = await prisma.race.findMany({});
  return <RaceTable races={races} />;
}
