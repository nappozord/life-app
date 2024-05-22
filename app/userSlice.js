import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, updateUser } from "~/api/apiUser";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await getUser();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: {
      reducer(state, action) {
        state.user = action.payload;
        updateUser(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
