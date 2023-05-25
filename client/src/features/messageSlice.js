import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  messages: [],
  chatId: null,
  isLoading: false,
};

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (data) => {
    const { token, user1, user2 } = data;
    try {
      const res = await axios.get("http://192.168.1.113:3001/fetchMessages", {
        headers: {
          Authorization: "Bearer " + token,
          user1,
          user2,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (data) => {
    const { content, user1, user2, token } = data;

    try {
      const res = await axios.post(
        "http://192.168.1.113:3001/message",
        { content, user1, user2 },
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
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* FETCH MESSAGES */
    builder.addCase(fetchMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload?.chat?.messages;
      state.chatId = action.payload?.chat?._id;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.err);
    });
    /* SEND MESSAGE */
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.err);
    });
  },
});

export default messageSlice.reducer;
