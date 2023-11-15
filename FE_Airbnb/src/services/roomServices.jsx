import { https } from "./config";
export const roomServ = {
  getAllRoom: () => {
    return https.get("/api/room");
  },
  getDetailRoom: (id) => {
    return https.get(`/api/room/${id}`);
  },
  getAllBookRoom: () => {
    return https.get("/api/bookroom");
  },
  postControlBook: (data) => {
    return https.post("/api/bookroom", data);
  },
  deleteRoom: (id) => {
    return https.delete(`/api/bookroom/${id}`);
  },
  getTypeRoom: () => {
    return https.get(`/api/type-room`);
  },
  getTypeRoomId: (id) => {
    return https.get(`/api/type-room/${id}`);
  },
  searchRoom: (data) => {
    return https.get(`/api/room/search/${data}`);
  },
};
