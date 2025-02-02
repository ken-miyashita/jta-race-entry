"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as React from "react";
import type { Team } from "@prisma/client";
import { TeamFormData } from "../lib/types";
import { sanitizeFormData } from "../lib/sanitize";

export type EditTeamFormProps = {
  team: Team;
};

export default function EditTeamForm({ team }: EditTeamFormProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    defaultValues: {
      ...team,
    },
  });

  const onSubmit: SubmitHandler<TeamFormData> = async (formData) => {
    try {
      const sanitizedFormData = sanitizeFormData(formData, true);
      await fetch(`/api/update_team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedFormData),
      });
    } catch (error) {
      console.error(error);
    }
    router.push(`/race/${team.raceId}`);
  };

  return <div>{team.sailNumber}</div>;
}
