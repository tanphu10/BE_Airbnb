import React, { useEffect, useState } from "react";
import { layDuLieuLocal } from "../../util/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { chatRoomApiId, searchRoomClient } from "../../redux/slices/chatSlice";
import { NavLink, Outlet } from "react-router-dom";
import HeaderChat from "../../Components/FormChat/HeaderChat";
import { SearchOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const ChatMessage = () => {
  const { groupChat } = useSelector((state) => state.chatSlice);
  const maNguoiDung = layDuLieuLocal("user")?.content.user;
  const dispatch = useDispatch();
  // console.log("groupChat",groupChat);
  useEffect(() => {
    if (!groupChat.length) {
      dispatch(chatRoomApiId(maNguoiDung.id));
    }
  }, []);

  const research = () => {
    let data = document.querySelector("#searchRoom").value;
    dispatch(searchRoomClient(data));
  };
  const handleKeyPass = (event) => {
    if (event.key === "Enter") {
      research();
    }
  };
  return (
    <Layout hasSider style={{ marginTop: "88px", overflow: "hidden" }}>
      <HeaderChat />
      <Sider
        className="bg-slate-700 mobile:hidden laptop:flex  desktop:flex hidden  col-span-2 text-center min-h-screen  "
        style={{
          overflowY: "scroll",
          height: "50px",
          left: 0,
          top: 0,
          backgroundColor: "#52525B",
        }}
      >
        <div className="bg-zinc-500 pb-2 fixed">
          <div className=" text-center  flex  my-[10px]  w-[184px] ">
            <input
              className="rounded-l-xl w-3/4 "
              type="text"
              placeholder="...search room"
              id="searchRoom"
              onKeyPress={handleKeyPass}
            ></input>
            <button
              className="w-1/4 bg-orange-500 rounded-r-xl"
              onClick={research}
            >
              <SearchOutlined />
            </button>
          </div>
        </div>
        <div className="mt-[70px] w-[184px] pb-[50px] ">
          {groupChat?.map((item, index) => {
            return (
              <>
                <div key={index} className=" xflex-col">
                  <ul>
                    <hr />
                    <li>
                      <NavLink
                        style={({ isActive }) =>
                          isActive
                            ? { color: "black", backgroundColor: "green" }
                            : {}
                        }
                        to={`/chat/${item.chat_id}`}
                        className="w-full py-3"
                      >
                        <button
                          className="text-white w-full py-3 text-sm "
                          // onClick={() => {
                          //   navigate(`/chat/${chat}`);
                          // }}
                        >
                          {item.group_chat.chat_name}
                        </button>
                      </NavLink>
                    </li>
                    {/* <hr /> */}
                  </ul>
                </div>
              </>
            );
          })}
        </div>
      </Sider>
      <Outlet />
    </Layout>
  );
};

export default ChatMessage;
