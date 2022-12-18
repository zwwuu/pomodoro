type SessionType = {
  id: string;
  name: string;
  duration: number;
};
export const WORK: SessionType = {
  id: "work",
  name: "Work",
  duration: 1500,
};
export const SHORT_BREAK: SessionType = {
  id: "short_break",
  name: "Short Break",
  duration: 300,
};
export const LONG_BREAK: SessionType = {
  id: "long_break",
  name: "Long Break",
  duration: 600,
};

export type Session = typeof WORK | typeof SHORT_BREAK | typeof LONG_BREAK;
