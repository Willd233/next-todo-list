// Dependencies.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Types.
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  active?: boolean;
  icon?: IconDefinition;
  onClick?: (event: ButtonClickEvent) => void;
};

// Styles.
import styles from "./styles.module.css";

export function Button(props: ButtonProps) {
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
