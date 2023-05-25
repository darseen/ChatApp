import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerUrl = "http://192.168.1.113:3001/register";
const loginUrl = "http://192.168.1.113:3001/login";

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

export const logout = createAsyncThunk("user/logout", async (args) => {
  const { userId, token } = args;
  try {
    const res = await axios.delete(
      `http://192.168.1.113:3001/logout/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
});

export const fetchMessages = createAsyncThunk(
  "user/fetchMessages",
  async () => {}
);

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
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.err.message;
    });

    /* LOGIN */
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.err;
    });

    /* LOGOUT */
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.err;
    });
  },
});

export default userSlice.reducer;
