import { https } from "./config";
export const commentService = {
  postComment: (data) => {
    return https.post("/api/comment", data);
  },
  getAllComment: () => {
    return https.get("/api/comment");
  },
  getCommentRoom: (id) => {
    return https.get(`/api/comment/get-room/${id}`);
  },
  deleteComment: (id) => {
    // console.log(id);
    return https.delete(`/api/comment/${id}`);
  },
  editComment: (id, data) => {
    return https.put(`/api/comment/${id}`, data);
  },
};
