import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./components/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
