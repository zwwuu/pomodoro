import styles from "./Progress.module.css";
import { useAppSelector } from "../../features/timer/hooks";
import clsx from "clsx";

type ProgressProps = {
  value: number;
};
export default function Progress({ value }: ProgressProps) {
  const { session } = useAppSelector((state) => state.timer);

  return (
    <div className={clsx(styles.root, styles[session.id])}>
      <div className={styles.progress} style={{ width: `${value}%` }} />
    </div>
  );
}
