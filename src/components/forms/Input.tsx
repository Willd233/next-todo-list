// src/components/forms/Input/Input.tsx
// Dependencies
import { useState, forwardRef } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: any;
  errors?: string;
};

// styles
import styles from "./styles.module.css";
import classNames from "classnames";

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

  if (type === "checkbox") {
    return (
      <div className={classNames(styles.inputGroup, styles.checkboxGroup)}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.checkbox}
          {...rest}
        />
      </div>
    );
  }

  const inputContainerStyles = classNames(styles.inputContainer, {
    [styles.focused]: isFocused,
  });

  const inputStyles = classNames(styles.input);

  return (
    <div className={styles.inputGroup} style={style}>
      {label && (
        <label
          htmlFor={rest.id || label.toLowerCase()}
          className={styles.inputLabel}
        >
          {label}
        </label>
      )}

      <div className={inputContainerStyles}>
        <div className={styles.inputIcon}>
          <FontAwesomeIcon icon={icon} />
        </div>

        <input
          autoComplete="on"
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </div>
      {errors && <p className={styles.error}>{errors}</p>}
    </div>
  );
});

Input.displayName = "Input";
