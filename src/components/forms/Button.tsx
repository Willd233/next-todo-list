import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  variant?: "main" | "secondary" | "tertiary";
  active?: boolean;
  icon?: IconDefinition;
  onClick?: (event: ButtonClickEvent) => void;
};

export function Button(props: ButtonProps) {
  // Destructuring props with default values
  const {
    type = "button",
    variant = "main",
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
      className={`${styles.button} ${styles[variant]} ${
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
