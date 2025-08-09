// Types
import { TFormProps } from "@/global/types";

// Styles.
import styles from "./styles.module.css";

export function Form(props: TFormProps) {
  const { className, style, onSubmit, children } = props;

  return (
    <form
      className={`${styles.form} ${className}`}
      style={style}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
