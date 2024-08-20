import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import view1 from "../../../assets/images/img_view1.jpg";
import view2 from "../../../assets/images/img_view2.jpg";
import view3 from "../../../assets/images/img_view3.jpg";
import view4 from "../../../assets/images/img_view4.jpg";

export default function ImageViewSwiper() {
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
        loop = {true} // vòng lặp của chuyển swiper
      >
        <SwiperSlide>
          <img
            className="img_swiper"
            src={view1}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={view2}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={view3}
            alt="img view"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="img_swiper"
            src={view4}
            alt="img view"
          ></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
