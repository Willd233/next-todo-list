import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type TStatus = "idle" | "loading" | "success" | "error";
export type TModal = "open" | "close";

export type DialogPosition = "center" | "right" | "left" | "top" | "bottom";

export type TDialogProps = {
  label: string;
  description?: string;
  showModal: "open" | "close";
  setShowModal: (value: "open" | "close") => void;
  position: DialogPosition;
  className?: string;
} & React.PropsWithChildren;

export type TLocale = "en" | "es";

export type TLanguageKeys = {
  spanish: string;
  english: string;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: any;
  errors?: string;
};

export type TFormProps = {
  className?: string;
  style?: React.CSSProperties;
  onSubmit?: (event: React.FormEvent) => void;
  children?: React.ReactNode;
};

export type TButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  active?: boolean;
  icon?: IconDefinition;
  onClick?: (event: TButtonClickEvent) => void;
};
