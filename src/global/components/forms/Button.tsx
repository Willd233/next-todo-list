// Dependencies.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Types.
import { TButtonProps } from "@/global/types";

// Styles.
import styles from "./styles.module.css";

export function Button(props: TButtonProps) {
  const {
    type = "button",
    size = "small",
    active = false,
    icon,
    onClick,
    disabled,
    className,
    style,
    children,
    ...rest
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[size]} ${
        active ? styles.active : ""
      } ${className}`}
      style={style}
      {...rest}
    >
      {icon && (
        <div className={styles.buttonIcon}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className={styles.buttonText}>{children}</div>
    </button>
  );
}
