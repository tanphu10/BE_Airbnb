import { https } from "./config";

export const chatService = {
  // signin: (data) => {
  //   return https.post("/api/auth/signin", data);
  // },
  // signup: (data) => {
  //   return https.post("/api/auth/signup", data);
  // },
  getRoomChatApi: (maNguoiDung) => {
    return https.get(`/api/chat/${maNguoiDung}`);
  },
  getMessage: (id) => {
    return https.get(`/api/chat/group-chat/${id}`);
  },
};
