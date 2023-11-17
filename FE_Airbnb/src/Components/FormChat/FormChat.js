import React, { useEffect, useRef, useState } from "react";
import { DOMAIN_BE_IMG } from "../../util/constants";
import { SendOutlined } from "@ant-design/icons";
import { layDuLieuLocal } from "../../util/localStorage";
import { Layout } from "antd";
import "./Chat.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { chatRoomApi, getAvtMessageApi } from "../../redux/slices/chatSlice";
import { adminUser } from "../../services/adminUser";

const { Content } = Layout;
const socket = io("ws://localhost:8080", { transports: ["websocket"] });

const FormChat = () => {
  const maNguoiDung = layDuLieuLocal("user")?.content.user;
  const { AvtUser } = useSelector((state) => state.chatSlice);
  // console.log("AvtUser", AvtUser.avatar);
  const params = useParams();
  // const listRef = useRef();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const myStyle = `
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
  margin-left: 10px;
`;
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on("send-data", (data) => {
      setChat([...chat, data]);
      console.log("data", data);
      let noiDung = "";
      let user = layDuLieuLocal("user").content.user;
      console.log("data_user", data);
      // console.log("user", user);

      if (data.user_id == user.id) {
        noiDung = `
        <li class="flex justify-end">
        <span
          class=" mx-3 bg-zinc-600 py-2 rounded-xl w-100
          px-4 text-white
          "
          style={{ textAlign: "center", text: "right" }}
        >
        ${data.content}
        </span>
        <img
        style="${myStyle}"
          src="${DOMAIN_BE_IMG + user.avatar}"
          alt=""
        />
      </li>`;
      } else {
        // adminUser
        //   .adminUserId(data.user_id)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((error) => alert(error));
        dispatch(getAvtMessageApi(data.user_id));
        noiDung = `
           <li class="flex justify-start ml-48">
            <img
            style="${myStyle}"
              src=${DOMAIN_BE_IMG + AvtUser.avatar}
              alt=""
            />
            <span
            class=" mx-3 bg-zinc-600 py-2 rounded-xl w-100
              px-4 text-white
              "
              style={{ textAlign: "center" }}
            >
            ${data.content}
            </span>
          </li>
         `;
      }
      document.querySelector("#noiDung").innerHTML += noiDung + "<br/>";
    });
    socket.on("join-room", (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);
  const joinRoom = () => {
    socket.emit("join-oom", params.id);
  };

  const sendMessage = async () => {
    let user_id = layDuLieuLocal("user").content?.user.id;
    let chat_id = params.id;
    let content = message;
    let updatedAt = new Date();
    let createdAt = new Date();
    let dataSend = { user_id, chat_id, content, updatedAt, createdAt };
    // console.log("dataSend", dataSend);
    await socket.emit("mess-send", dataSend);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // const [active, setactive] = useState(false);
  // console.log(active);
  // const handleActive = () => {
  //   setactive(!active);
  // };
  // useEffect(() => {
  //   dispatch()
  //   // const handleScroll = () => {
  //   //   const lastItem = listRef.current.lastElementChild;
  //   //   const lastItemOffset = lastItem.offetTop + lastItem.clientHeight;
  //   //   const pageOffset = window.pageYOffset + window.innerHeight;
  //   //   if (pageOffset > lastItemOffset) {
  //   //     // Đây là nơi để xử lý sự kiện khi phần tử cuối cùng hiển thị
  //   //     console.log("Phần tử cuối cùng hiển thị!");
  //   //     // Thực hiện hành động của bạn ở đây
  //   //   }
  //   // };
  //   // window.addEventListener("scroll", handleScroll);
  //   // // Cleanup effect khi component unmount
  //   // return () => {
  //   //   window.removeEventListener("scroll", handleScroll);
  //   // };
  // }, []);
  return (
    <Layout className="site-layout ml-0">
      {/* <HeaderChat /> */}
      <Content
        style={{
          overflowY: "initial",
          overflowX: "hidden",
          marginTop: "80px",
        }}
      >
        <ul
          style={{
            overflowY: "scroll",
            height: "70vh",
            // marginTop: "100px",
            // marginRight: "10px",
            // padding: 24,
            textAlign: "center",
          }}
          id="noiDung"
        ></ul>
        <div className="flex justify-items-center items-center tablet:ml-0   laptop:mb-0  laptop:w-[50%] desktop:mb-0 desktop:w-[85%] desktop:ml-[200px] fixed bottom-16 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600  ">
          <div
            className="min-w-max"
            style={{
              height: "100%",
              padding: "0",
              borderRadius: "50%",
            }}
          >
            <img
              src={DOMAIN_BE_IMG + maNguoiDung.avatar}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="relative z-0 w-full ml-3 mb-8 group">
            <input
              type="text"
              id="noiDung"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write an answer ..."
              onKeyPress={handleKeyPress}
            />
          </div>
          <div
            style={{
              height: "100%",
              borderRadius: "50%",
            }}
          >
            <button
              id="comment"
              className=" text-black  hover:text-blue-700 p-3 "
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              onClick={sendMessage}
            >
              <SendOutlined />
            </button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default FormChat;
