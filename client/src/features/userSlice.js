import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerUrl = "http://localhost:3001/user/auth/register";
const loginUrl = "http://localhost:3001/user/auth/login";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: false,
};

export const register = createAsyncThunk(
  "user/register",
  async (credentials) => {
    const { username, email, password } = credentials;
    try {
      const res = await axios.post(registerUrl, { username, email, password });
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const login = createAsyncThunk("user/login", async (credentials) => {
  const { username, password } = credentials;
  try {
    const res = await axios.post(loginUrl, { username, password });
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* REGISTER */
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      console.log(user);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    /* LOGIN */
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      console.log(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
