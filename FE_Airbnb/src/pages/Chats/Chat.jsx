import React, { useEffect, useState } from "react";
import { layDuLieuLocal } from "../../util/localStorage";
import { DOMAIN_BE_IMG } from "../../util/constants";
import { getAllUser, getInfoUserApi } from "../../redux/slices/adminUserSlices";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("ws://localhost:8080");
// console.log(socket);
const ChatMessage = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { user_id } = layDuLieuLocal("user").content?.user;
  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setChat([...chat, msg]);
    });
    socket.on("joinedRoom", (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);
  const joinRoom = () => {
    socket.emit("joinRoom", room);
  };

  const sendMessage = () => {
    console.log(room);
    console.log(message);
    socket.emit("chatMessage", { room, message });
    setMessage("");
  };

  // Xử lý sự kiện nhấn phím Enter để gửi tin nhắn
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     sendMessage();
  //   }
  // };
  // const { getUser } = useSelector((state) => state.adminUser);

  // socket.on("send-data", (txtsend) => {
  //   // console.log("đây là server gửi về", txtsend);
  //   setMessages(txtsend);
  //   console.log("new text ", messages);
  //   document.querySelector("#noiDung").innerHTML += txtsend + "<br/>";
  // });
  return (
    <div className="mt-24">
      <div>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room name"
      />
      <button
        className="bg-orange-500  rounded-md py-2 px-4"
        onClick={joinRoom}
      >
        Join Room
      </button>
      <br />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-orange-500  rounded-md py-2 px-4"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

//   return (
//     <div className="container my-20 mx-10">
//       <div className="flex flex-row clearfix">
//         <div className="card relation-chat mt-16 basis-1/3">
//           <div>
//             <input
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <button
//               className="bg-orange-500  rounded-md py-2 px-4"
//               onClick={handleJoinChat}
//             >
//               Join Chat
//             </button>{" "}
//           </div>
//         </div>
//         <div className="card chat-app basis-2/3">
//           <div id="plist" className="people-list mt-16">
//             <div
//               id="noiDung"
//               style={{
//                 height: "300px",
//                 overflowY: "scroll",
//                 border: "1px solid #ccc",
//                 padding: "10px",
//               }}
//             >
//               <ul>
//                 {messages.map((msg, index) => (
//                   <li key={index}>
//                     <strong>{msg.username}:</strong> {msg.message}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="chat">
//             {layDuLieuLocal("user") ? (
//               <div className="flex justify-items-center items-center desktop:mb-0 laptop:mb-0 tablet:mb-0 mb-[30px] laptop:w-[50%] desktop:w-[50%] w-[100%] mt-8 ">
//                 <div
//                   className="min-w-max"
//                   style={{
//                     height: "100%",
//                     padding: "0",
//                     borderRadius: "50%",
//                   }}
//                 >
//                   <img
//                     src={DOMAIN_BE_IMG + getUser.avatar}
//                     alt=""
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       borderRadius: "50%",
//                     }}
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   className="rounded-2xl text-white mx-2"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   style={{
//                     width: "70%",
//                     padding: "8px",
//                     backgroundColor: "#3a3b3c",
//                   }}
//                 />
//                 <div
//                   style={{
//                     height: "100%",
//                     borderRadius: "50%",
//                   }}
//                 >
//                   <button
//                     id="btn-send"
//                     className=" text-black  hover:text-blue-700  p-3 "
//                     onClick={handleSendMessage}
//                     style={{
//                       width: "30px",
//                       height: "30px",
//                       borderRadius: "50%",
//                     }}
//                   >
//                     <SendOutlined />
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default ChatMessage;
