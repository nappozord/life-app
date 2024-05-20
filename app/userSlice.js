import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

async function getUser() {
  let jsonValue = await AsyncStorage.getItem("user");
  return jsonValue ? JSON.parse(jsonValue) : null;
}

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
        AsyncStorage.setItem("user", JSON.stringify(state.user));
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
