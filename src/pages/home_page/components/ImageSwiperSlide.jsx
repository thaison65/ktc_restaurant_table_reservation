import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import img_food_swiper1 from "../../../assets/images/img_food_swiper8.jpg";
import img_food_swiper2 from "../../../assets/images/img_food_swiper2.jpg";
import img_food_swiper3 from "../../../assets/images/img_food_swiper3.jpg";
import img_food_swiper4 from "../../../assets/images/img_food_swiper4.jpg";
import img_food_swiper5 from "../../../assets/images/img_food_swiper5.jpg";
import img_food_swiper6 from "../../../assets/images/img_food_swiper6.jpg";
import img_food_swiper7 from "../../../assets/images/img_food_swiper7.jpg";
export default function ImageHeaderSwiper() {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 1500, // Thời gian chuyển sidle
          disableOnInteraction: false, // Giữ auto chạy sao khi người dùng tương tác
        }}
        speed={2000} // Tốc độ của transition
        loop={true} // vòng lặp của chuyển swiper
      >
        <SwiperSlide>
          <img className="C" src={img_food_swiper1} alt="img view"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={img_food_swiper2}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={img_food_swiper3}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={img_food_swiper4}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={img_food_swiper5}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={img_food_swiper6}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={img_food_swiper7}
            alt="img view"
          ></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
