"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Stack } from "@mui/material";

type AdminPortalProps = {
  adminPassword?: string; // サーバーから取得したパスワードの正解値
};

export default function AdminPortalGuarded({
  adminPassword,
}: AdminPortalProps) {
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(false);

  if (!isPasswordCorrect) {
    return (
      <PasswordInput
        adminPassword={adminPassword}
        setIsPasswordCorrect={setIsPasswordCorrect}
      />
    );
  } else {
    return <AdminPortal />;
  }
}

function PasswordInput({
  adminPassword,
  setIsPasswordCorrect,
}: {
  adminPassword?: string;
  setIsPasswordCorrect: (isPasswordCorrect: boolean) => void;
}) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === adminPassword) {
      setIsPasswordCorrect(true);
      sessionStorage.setItem("isAuthenticated", "true");
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
      <Button variant="contained" onClick={handleNewRace}>
        レース新規作成
      </Button>
      <Button variant="contained" onClick={handleListRaces}>
        レース一覧
      </Button>
    </Stack>
  );
}
