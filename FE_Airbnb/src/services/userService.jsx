import { https } from "./config";

export const userService = {
  signin: (data) => {
    return https.post("/api/auth/signin", data);
  },
  signup: (data) => {
    return https.post("/api/auth/signup", data);
  },
  roomUserBooked: (maNguoiDung) => {
    return https.get(`/api/bookroom/get-by-id/${maNguoiDung}`);
  },
};
