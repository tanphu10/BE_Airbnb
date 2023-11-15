import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { BiHomeHeart } from "react-icons/bi";
import "./Banner.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiTypeRoom,
  getApiTypeRoomId,
} from "../../redux/slices/roomSLices";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 5 },
  { width: 1200, itemsToShow: 5 },
];

const Banner = () => {
  const dispatch = useDispatch();
  const { arrTypeRoom } = useSelector((state) => state.room);
  // console.log("arrTypeRoom", arrTypeRoom);
  useEffect(() => {
    if (!arrTypeRoom.length > 0) {
      dispatch(getApiTypeRoom());
    }
  });

  // const icons = [
  //   {
  //     title: "Thật ấn tượng",
  //     icon: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
  //   },
  //   {
  //     title: "Công viên quốc gia",
  //     icon: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
  //   },
  //   {
  //     title: "Hồ bơi tuyệt vời",
  //     icon: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
  //   },
  //   {
  //     title: "Đảo",
  //     icon: "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
  //   },
  //   {
  //     title: "Bãi biển",
  //     icon: "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
  //   },
  //   {
  //     title: "Nhà nhỏ",
  //     icon: "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
  //   },
  //   {
  //     title: "Thiết kế",
  //     icon: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
  //   },
  //   {
  //     title: "Bắc Cực",
  //     icon: "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
  //   },
  //   {
  //     title: "Cabin",
  //     icon: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
  //   },
  //   {
  //     title: "Ven Hồ",
  //     icon: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
  //   },
  //   {
  //     title: "Chơi golf",
  //     icon: "https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg",
  //   },
  //   {
  //     title: "Khung cảnh tuyệt vời",
  //     icon: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
  //   },
  //   {
  //     title: "Hang động",
  //     icon: "https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
  //   },
  //   {
  //     title: "Lướt sóng",
  //     icon: "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
  //   },
  //   {
  //     title: "Khung nhà chữ A",
  //     icon: "https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg",
  //   },
  //   {
  //     title: "Dưới lòng đất",
  //     // onclick: beach(),
  //     icon: "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
  //   },
  // ];
  // const [item, setItem] = useState(icons);
  return (
    <div id="banner">
      <Carousel breakPoints={breakPoints}>
        {arrTypeRoom.map(({ id, type_name, icons }, index) => {
          // console.log(icons);
          return (
            <button
              className="swiper-slide"
              key={index}
              onClick={() => {
                dispatch(getApiTypeRoomId(id));
              }}
            >
              <img className="icons" src={icons} alt="" />
              <span className="title">{type_name}</span>
            </button>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
