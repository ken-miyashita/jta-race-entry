"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Stack } from "@mui/material";
import Race from "../app/race/[raceId]/page";

export type RacePortalProps = {
  raceId: number;
};

export default function RacePortal({ raceId }: RacePortalProps) {
  const router = useRouter();

  const handleListEntries = () => {
    router.push(`/race/${raceId}/list_entries`);
  };
  const handleNewEntry = () => {
    router.push(`/race/${raceId}/new_entry`);
  };

  return (
    <Stack spacing={2} sx={{ m: 2, width: "25ch" }}>
      <Button variant="contained" onClick={handleNewEntry}>
        エントリー登録
      </Button>
      <Button variant="contained" onClick={handleListEntries}>
        エントリー一覧
      </Button>
    </Stack>
  );
}
