"use client";

// Dependencies.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { faX } from "@fortawesome/free-solid-svg-icons";

// Components.
import { Button } from "../forms";

// Types
import { TDialogProps } from "@/global/types";

// Styles.
import styles from "./Dialog.module.css";

const dialogVariants = {
  center: {
    enter: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  top: {
    enter: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  bottom: {
    enter: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  left: {
    enter: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  right: {
    enter: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

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

  return (
    <AnimatePresence>
      {showModal === "open" && (
        <motion.div
          className={styles.dialogContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.dialog
            className={`${styles.dialog} ${styles[position]} ${className}`}
            open
            onClick={(e) => {
              e.stopPropagation();
            }}
            variants={dialogVariants[position]}
            initial="exit"
            animate="enter"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
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
                size="small"
              >
                <FontAwesomeIcon icon={faX} />
              </Button>
              <div className={styles.dialogContent}>{children}</div>
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
