import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUser, updateUser as updateUserFromAPI } from "~/api/apiUser";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await getUser();
  return response;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, { dispatch, getState }) => {
    dispatch(_updateUser(payload));
    const user = getState().user;
    updateUserFromAPI(user.user);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    _updateUser(state, action) {
      state.user = action.payload;
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

export const { _updateUser } = userSlice.actions;

export default userSlice.reducer;
