import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  message: [],
  isLoading: false,
};

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async () => {}
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* FETCH MESSAGES */
  },
});

export default messageSlice.reducer;
