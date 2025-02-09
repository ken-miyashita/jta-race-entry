"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Stack } from "@mui/material";
import { useAdmin } from "../lib/useAdmin";

type AdminPortalProps = {
  adminPassword?: string; // サーバーから取得したパスワードの正解値
};

export default function AdminPortalGuarded({
  adminPassword,
}: AdminPortalProps) {
  const [isAdmin, setIsAdmin] = React.useState<boolean | undefined>(undefined);
  useAdmin(setIsAdmin);

  if (isAdmin === undefined) {
    return <p></p>;
  } else if (!isAdmin) {
    return (
      <PasswordInput adminPassword={adminPassword} setIsAdmin={setIsAdmin} />
    );
  } else {
    return <AdminPortal />;
  }
}

function PasswordInput({
  adminPassword,
  setIsAdmin,
}: {
  adminPassword?: string;
  setIsAdmin: (isAdmin: boolean) => void;
}) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === adminPassword) {
      sessionStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
    } else {
      setError("パスワードが正しくありません");
    }
  };

  return (
    <div>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handlePasswordSubmit}>ログイン</button>
      {error && <p>{error}</p>}
    </div>
  );
}

function AdminPortal() {
  const router = useRouter();

  const handleListRaces = () => {
    router.push(`/list_races`);
  };
  const handleNewRace = () => {
    router.push(`/new_race`);
  };

  return (
    <Stack spacing={2} sx={{ m: 2, width: "25ch" }}>
      <h1>管理者ポータル</h1>
      <Button variant="contained" onClick={handleNewRace}>
        レース新規作成
      </Button>
      <Button variant="contained" onClick={handleListRaces}>
        レース一覧
      </Button>
    </Stack>
  );
}
