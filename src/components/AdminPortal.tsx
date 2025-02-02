"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Stack } from "@mui/material";

export default function AdminPortal() {
  const router = useRouter();

  const handleListRaces = () => {
    router.push(`/list_races`);
  };
  const handleNewRace = () => {
    router.push(`/new_race`);
  };

  return (
    <Stack spacing={2} sx={{ m: 2, width: "25ch" }}>
      <Button variant="contained" onClick={handleNewRace}>
        レース新規作成
      </Button>
      <Button variant="contained" onClick={handleListRaces}>
        レース一覧
      </Button>
    </Stack>
  );
}
