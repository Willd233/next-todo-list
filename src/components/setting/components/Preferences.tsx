import { Button } from "@/global/components/forms";
import styles from "./styles/Preferences.module.scss";

import { signOut } from "next-auth/react";
import { LangSelector } from "@/global/components/LangSelect/LangSelect";

export function Preferences() {
  return (
    <div className={styles.container}>
      <h2>preferences</h2>
      <LangSelector />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
