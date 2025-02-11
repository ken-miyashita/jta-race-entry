import AdminPortal from "../components/AdminPortal";

export default async function Home() {
  // 環境変数からパスワードを取得
  const adminPassword = process.env.WEB_ADMIN_PASSWORD;

  return (
    <div>
      <AdminPortal adminPassword={adminPassword} />
    </div>
  );
}
