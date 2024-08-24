import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API_URL } from "../../../assets/config/config_url";
export default function ImageViewSwiper({ id }) {
  const [dataView, setDataView] = useState([{}]);
  useEffect(() => {
    const getView = async () => {
      const url = `${API_URL}category/getViews/${id}`;
      console.log(url);
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        });
        if (!res.ok) {
          throw new Error(`Fetch data error: ${res.status}`);
        }
        const json = await res.json();
        setDataView(json.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getView();
  }, [id]);
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 2000, // Thời gian chuyển sidle
          disableOnInteraction: false, // Giữ auto chạy sao khi người dùng tương tác
        }}
        speed={2000} // Tốc độ của transition
        loop={true} // vòng lặp của chuyển swiper
      >
        {dataView.map((view, index) => (
          <SwiperSlide key={index}>
            <img
              className="img_swiper_view_more"
              src={view.desk_img}
              alt={`img view ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
ImageViewSwiper.propTypes = {
  id: PropTypes.number.isRequired,
};
