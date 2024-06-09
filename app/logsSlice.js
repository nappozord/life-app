import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLogs as getLogsFromAPI } from "~/api/apiLogs";
import { updateLogs } from "~/api/apiLogs";

const initialState = {
  logs: [],
  status: "idle",
  error: null,
};

export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
  const response = await getLogsFromAPI();
  return response;
});

export const addLog = createAsyncThunk(
  "logs/addLog",
  async (log, { dispatch }) => {
    dispatch(_addLog(log));
    updateLogs(log);
  }
);

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    _addLog(state, action) {
      const date = new Date();

      // Get the hours and minutes from the Date object
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // Format the hours and minutes
      const formattedTime =
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0");

      for (l of action.payload) {
        state.logs.push({
          id: state.logs.length,
          date: date.toISOString().split("T")[0],
          time: formattedTime,
          ...l,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { _addLog } = logsSlice.actions;

export default logsSlice.reducer;
