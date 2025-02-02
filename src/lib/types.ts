import type { Dayjs } from "dayjs";
import type { Prisma } from "@prisma/client";

// Person データのうち、UI で編集可能なもの（新規作成時も含めて）を抜き出したもの。
export type PersonFormData = Omit<
  Prisma.PersonCreateInput,
  "id" | "birthDay" | "team" | "teamId" | "role" | "createdAt"
> & {
  birthDay: string | Dayjs | null;
};

export type NewPersonFormData = PersonFormData;

export type EditPersonFormData = PersonFormData & {
  id: number;
};

// Team データのうち、UI で編集可能なもの（新規作成時も含めて）を抜き出したもの。
export type TeamFormData = Omit<
  Prisma.TeamCreateInput,
  "id" | "persons" | "race" | "createdAt"
> & {
  // skipper, crew1 を必須とする。
  skipper: PersonFormData;
  crew1: PersonFormData;

  // crew2 のデータが有効かは、isCrew2Valid（UIとしてはチェックボックス）で管理する。
  // UI では一時的に crew2 データを入力したりもできるので、最終的にはチェックボックスの値をもとに
  // データを保存する。
  crew2?: PersonFormData;
  isCrew2Valid: boolean;
};

export type NewTeamFormData = TeamFormData;

export type EditTeamFormData = TeamFormData & {
  id: number;
  raceId: number;
};

// Race データのうち、UI で編集可能なもの（新規作成時も含めて）を抜き出したもの。
export type RaceFormData = Omit<
  Prisma.RaceCreateInput,
  "id" | "teams" | "createdAt"
>;

export type NewRaceFormData = RaceFormData;

export type EditRaceFormData = RaceFormData & {
  id: number;
};
