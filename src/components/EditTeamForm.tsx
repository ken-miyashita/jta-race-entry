"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

import * as React from "react";

import { EditTeamFormData, TeamFormData } from "../lib/types";
import { sanitizeTeamFormData } from "../lib/sanitize";
import { useAdmin } from "../lib/useAdmin";
export type EditTeamFormProps = {
  initialFormData: EditTeamFormData;
};

import TeamForm from "./TeamForm";

export default function EditTeamForm({ initialFormData }: EditTeamFormProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState<boolean | undefined>(undefined);
  useAdmin(setIsAdmin);

  const onSubmit: SubmitHandler<TeamFormData> = async (formData) => {
    try {
      const sanitizedFormData = sanitizeTeamFormData(formData);
      await fetch(`/api/update_team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedFormData),
      });
    } catch (error) {
      console.error(error);
    }
    router.push(`/race/${initialFormData.raceId}`);
  };

  if (isAdmin === undefined) {
    return <p></p>;
  } else if (!isAdmin) {
    return <p>このページは管理者のみが閲覧できます。</p>;
  }
  return (
    <div>
      <h2>チーム編集（管理者モード）</h2>
      <TeamForm onSubmit={onSubmit} initialFormData={initialFormData} />
    </div>
  );
}
