"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

import * as React from "react";

import type { TeamFormData } from "../lib/types";
import { sanitizeTeamFormData } from "../lib/sanitize";

export type NewTeamFormProps = {
  raceId: number;
};

import "dayjs/locale/ja";
import TeamForm from "./TeamForm";

export default function NewTeamForm({ raceId }: NewTeamFormProps) {
  const router = useRouter();

  const onSubmit: SubmitHandler<TeamFormData> = async (formData) => {
    try {
      const sanitizedFormData = sanitizeTeamFormData(formData);
      const body = { raceId, ...sanitizedFormData };
      await fetch(`/api/new_team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    router.push(`/race/${raceId}`);
  };
  return (
    <div>
      <h2>エントリー入力</h2>
      <TeamForm onSubmit={onSubmit} />
    </div>
  );
}
