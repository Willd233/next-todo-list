// Dependencies
import { useState, forwardRef } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: any;
  errors: string;
};

// styles
import styles from "./styles.module.css";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    placeholder,
    style,
    label,
    icon = faUser,
    type = "text",
    errors = "",
    ...rest
  } = props;

  return (
    <div className={styles.formGroup} style={style}>
      {label && (
        <label htmlFor={label.toLowerCase()} className={styles.formLabel}>
          {label}
        </label>
      )}

      <div
        className={`${styles.inputContainer} ${
          isFocused ? styles.focused : ""
        }`}
      >
        <div className={styles.inputIcon}>
          <FontAwesomeIcon icon={icon} />
        </div>

        <input
          autoComplete="on"
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </div>
      <p className={styles.error}>{errors}</p>
    </div>
  );
});

Input.displayName = "Input";
