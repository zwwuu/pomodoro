import styles from "./Button.module.css";
import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  classNames?: string;
  icon?: ReactNode;
  onClick(): void;
};

export default function Button({ children, icon, classNames, onClick, ...props }: ButtonProps) {
  return (
    <button className={clsx(styles.button, classNames)} onClick={onClick} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {children}
    </button>
  );
}
