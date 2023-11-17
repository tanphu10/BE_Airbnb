import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatService } from "../../services/chatService";
import { adminUser } from "../../services/adminUser";

export const chatRoomApiId = createAsyncThunk(
  "chat/chatRoomApi",
  async (id) => {
    const res = await chatService.getRoomChatApi(id);
    console.log(res);
    return res.data.content;
  }
);
export const getAvtMessageApi = createAsyncThunk(
  "chats/getAvtMessageApi",
  async (id) => {
    console.log(id);
    const res = await adminUser.adminUserId(id);
    console.log("user Id", res);
    return res.data.content;
  }
);
// lần đầu tiên người ta vào trang web store sẽ được khởi tạo
const initialState = {
  groupChat: [],
  arrMessage: [],
  AvtUser: [],
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    searchRoomClient: (state, action) => {
      console.log("action", action.payload);
      let data = action.payload;
      let newData = state.groupChat.filter((item) => {
        return item.group_chat.chat_name.includes(data);
      });
      console.log("newData", newData);
      state.groupChat = [];
      state.groupChat = newData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chatRoomApiId.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.groupChat = action.payload;
      // console.log("groupChat: ", state.groupChat);
    });

    builder.addCase(getAvtMessageApi.fulfilled, (state, action) => {
      state.AvtUser = action.payload;
      // console.log("AvtUser: ", state.AvtUser);
    });
  },
});
// phương thức giúp cho chúng ta đem vào sài ở phương thức component
export const { searchRoomClient } = chatSlice.actions;
// giúp chúng ta import vào bên trong store redux
export default chatSlice.reducer;
