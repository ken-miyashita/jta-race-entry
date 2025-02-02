import AdminPortal from "../components/AdminPortal";

type PageParams = {
  adminPassword: string;
};

export default async function Home(props: { params: Promise<PageParams> }) {
  const params = await props.params;
  const adminPassword = params.adminPassword;

  console.log(adminPassword);

  return (
    <div>
      <AdminPortal />
    </div>
  );
}
