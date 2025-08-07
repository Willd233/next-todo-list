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
