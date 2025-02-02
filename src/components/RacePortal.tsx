"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Stack } from "@mui/material";

export type RacePortalProps = {
  raceId: number;
};

export default function RacePortal({ raceId }: RacePortalProps) {
  const router = useRouter();

  const handleListTeams = () => {
    router.push(`/race/${raceId}/list_teams`);
  };
  const handleNewTeam = () => {
    router.push(`/race/${raceId}/new_team`);
  };

  return (
    <Stack spacing={2} sx={{ m: 2, width: "25ch" }}>
      <Button variant="contained" onClick={handleNewTeam}>
        チーム登録
      </Button>
      <Button variant="contained" onClick={handleListTeams}>
        チーム一覧
      </Button>
    </Stack>
  );
}
