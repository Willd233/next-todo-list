export type DialogPosition = "center" | "top" | "bottom" | "left" | "right";

type TDialogProps = {
  label: string;
  description?: string;
  showModal: "open" | "close";
  setShowModal: (value: "open" | "close") => void;
  position: DialogPosition;
  className?: string;
} & React.PropsWithChildren;

import { Button } from "../forms";
import styles from "./Dialog.module.css";

export default function Dialog(props: TDialogProps) {
  const {
    label,
    description,
    showModal,
    setShowModal,
    children,
    position,
    className,
  } = props;

  if (showModal === "close") return null;

  return (
    <div className={styles.dialogContainer}>
      <dialog
        className={`${styles.dialog} ${styles[position]} ${className} `}
        open
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <h2 className={styles.dialogTitle}>{label}</h2>
          {description && (
            <p className={styles.dialogDescription}>{description}</p>
          )}
          <Button
            className={styles.closeButton}
            onClick={() => setShowModal("close")}
            type="button"
            variant="main"
          >
            Cerrar
          </Button>
          <div className={styles.dialogContent}>{children}</div>
        </div>
      </dialog>
    </div>
  );
}
