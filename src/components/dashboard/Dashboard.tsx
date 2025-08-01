"use client";
import { useSession } from "next-auth/react";

export function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name}</p>
    </div>
  );
}
