// Types

type FormProps = {
  className?: string;
  style?: React.CSSProperties;
  onSubmit?: (event: React.FormEvent) => void;
  children?: React.ReactNode;
};

// Components
import styles from "./styles.module.css";

export function Form(props: FormProps) {
  // Destructuring props with default values
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
