import { createSlice } from "@reduxjs/toolkit";
import { Session, SHORT_BREAK, LONG_BREAK, WORK } from "./type";

export interface TimerState {
  session: Session;
  round: number;
  isMuted: boolean;
}

const initialState: TimerState = {
  session: WORK,
  round: 1,
  isMuted: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incrementRound: (state) => {
      state.round = state.round + 1;
      if (state.round % 4 === 0) {
        state.session = LONG_BREAK;
        return;
      }

      if (state.session.id === WORK.id) {
        state.session = SHORT_BREAK;
      } else {
        state.session = WORK;
      }
    },
    reset: (state) => {
      state.session = WORK;
      state.round = 1;
    },
    toggleAlarm: (state) => {
      state.isMuted = !state.isMuted;
    },
  },
});

export const { incrementRound, reset, toggleAlarm } = timerSlice.actions;

export default timerSlice.reducer;
