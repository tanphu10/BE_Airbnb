import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { layDuLieuLocal } from "../../util/localStorage";
import { Header } from "antd/es/layout/layout";
import { DOMAIN_BE_IMG } from "../../util/constants";
import { SearchOutlined } from "@ant-design/icons";
import { searchRoomClient } from "../../redux/slices/chatSlice";

const HeaderChat = () => {
  const maNguoiDung = layDuLieuLocal("user")?.content.user;
  const { groupChat } = useSelector((state) => state.chatSlice);
  const [active, setactive] = useState(false);
  const dispatch = useDispatch();
  // console.log("groupChat", groupChat);
  const handleActive = () => {
    setactive(!active);
  };
  const research = () => {
    let data = document.querySelector("#search_room_2").value;
    // console.log("data", data);
    dispatch(searchRoomClient(data));
  };
  const handleKeyPass = (event) => {
    if (event.key === "Enter") {
      research();
    }
  };
  return (
    <Header className="header-chat tablet:ml-0 laptop:ml-[200px] desktop:ml-[200px] bg-zinc-600 ">
      <div
        className="mx-auto flex justify-between  "
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          lineHeight: "50px",
        }}
      >
        <div className="flex">
          <div>
            {maNguoiDung.avatar ? (
              <div className="min-w-max mt-2">
                <NavLink to="/infouser">
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                    src={DOMAIN_BE_IMG + maNguoiDung.avatar}
                    alt=""
                    className=""
                  />
                </NavLink>
              </div>
            ) : (
              <div
                className="bg-slate-600 text-center"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              >
                <i className="fa-solid fa-user "></i>
              </div>
            )}
          </div>
          <div>
            <NavLink to="/infouser">
              <h1 className="text-white ml-2 ">{maNguoiDung.full_name}</h1>
            </NavLink>
          </div>
        </div>
        <div onClick={handleActive} className="block laptop:hidden mr-0">
          {!active ? (
            <i class="fa-solid fa-xmark"></i>
          ) : (
            <i class="fa-solid fa-bars"></i>
          )}
        </div>
      </div>

      <div
        className={
          !active
            ? "fixed left-0 top-[152px] w-[25%] border-r-gray-900  bg-[orange] ease-in-out duration-500 "
            : "fixed left-[-100%]"
        }
      >
        <div
          className="display_nav laptop:hidden desktop:hidden  flex-col "
          style={{ overflowY: "scroll", height: "50vh" }}
        >
          <div className="fixed bg-zinc-600">
            <div className=" text-center  flex  my-[10px]  w-[143px] ">
              <input
                className="rounded-l-xl w-3/4 "
                type="text"
                placeholder="...search"
                id="search_room_2"
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
          <hr />
          <div className="mt-16">
            <hr />
            {groupChat?.map((item, index) => {
              return (
                <>
                  <ul className="">
                    <li className="p-0">
                      <NavLink
                        style={({ isActive }) =>
                          isActive
                            ? { color: "black", backgroundColor: "green" }
                            : {}
                        }
                        to={`/chat/${item.chat_id}`}
                        className="w-full py-3"
                      >
                        <button className="text-white w-full py-3 text-sm">
                          {item.group_chat.chat_name}
                        </button>
                      </NavLink>
                    </li>
                    <hr />
                  </ul>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderChat;
