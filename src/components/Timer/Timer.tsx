import Button from "../Button/Button";
import { IconBell, IconBellOff } from "@tabler/icons";
import styles from "./Timer.module.css";
import Progress from "../Progress/Progress";
import clsx from "clsx";
import useCountdown from "../../hooks/useCountdown";
import { useAppDispatch, useAppSelector } from "../../features/timer/hooks";
import { incrementRound, reset, toggleAlarm } from "../../features/timer/slice";
import useSound from "use-sound";

export default function Timer() {
  const dispatch = useAppDispatch();
  const { session, round, isMuted } = useAppSelector((state) => state.timer);
  const [play] = useSound("/audio/alarm.mp3", { volume: isMuted ? 0 : 1 });
  const { timeLeft, isActive, isRunning, start, stop, pause, resume } = useCountdown({
    initial: session.duration,
    onCompleted: () => {
      dispatch(incrementRound());
      start();
      play();
    },
  });

  const formattedTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progress = (time: number) => {
    return (time / session.duration) * 100;
  };

  return (
    <div className={clsx(styles.root, styles[session.id])}>
      <div className={styles.round}>{`#${round}`}</div>
      <h1 className={styles.label}>{`${session.name}`}</h1>
      <Progress value={progress(timeLeft)} />
      <h2 className={styles.time}>{`${formattedTime(timeLeft)}`}</h2>
      <div className={styles.actions}>
        <div className={styles.controls}>
          {isActive ? (
            <>
              <Button onClick={isRunning ? pause : resume}>{isRunning ? "Pause" : "Resume"}</Button>
              <Button
                onClick={() => {
                  stop();
                  dispatch(reset());
                }}
              >
                Reset
              </Button>
            </>
          ) : (
            <Button onClick={start}>Start</Button>
          )}
        </div>
        <Button classNames={clsx(styles.alarm)} aria-label={"unmute/mute"} onClick={() => dispatch(toggleAlarm())}>
          {isMuted ? <IconBellOff /> : <IconBell />}
        </Button>
      </div>
    </div>
  );
}
