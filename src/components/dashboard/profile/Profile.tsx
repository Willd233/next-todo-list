"use client";
import { Button } from "@/components/forms";
import { signOut } from "next-auth/react";

export function Profile() {
  return (
    <div>
      <h1>profile</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
