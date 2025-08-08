"use client";

import { Button } from "@/global/components/forms";
import { Preferences } from "./components/Preferences";
import { Profile } from "./components/Profile";
import styles from "./styles/Setting.module.scss";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function Setting() {
  return (
    <div className={styles.container}>
      <Button
        type="button"
        icon={faArrowLeft}
        onClick={() => window.history.back()}
      >
        Back
      </Button>
      <div className={styles.content}>
        <Profile />
        <Preferences />
      </div>
    </div>
  );
}
