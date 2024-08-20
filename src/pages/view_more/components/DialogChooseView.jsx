import { useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ic_arr_left_transition_swiper from '../../../assets/icons/arr_transition_left.svg';
import ic_arr_right_transition_swiper from '../../../assets/icons/arr_transition_right.svg';
import view1 from "../../../assets/images/img_view1.jpg";
import view2 from "../../../assets/images/img_view2.jpg";
import view3 from "../../../assets/images/img_view3.jpg";
import view4 from "../../../assets/images/img_view4.jpg";

const DialogChooseView = ({ isOpen, onClose, title }) => {
  
    const swiperRef = useRef(null); // sử dụng useRef để tác động vào DOM nhằm lấy index của swiper
    const [currentIndex, setCurrentIndex] = useState(0); // Giá trị hiện tại của swiper 

    const handleSlideChange = (swiper) => {
      setCurrentIndex(swiper.activeIndex); // Cập nhật index 
    };

  if (!isOpen) return null;
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{title}</h2>
        <div className="container_content_dialog_view">
        { currentIndex == 0 ? <div className="draf_container"></div>: <button
            className="button_transition_swiper"
            onClick={() => swiperRef.current.swiper.slidePrev()}
            style={{ display: currentIndex === 0 ? "none" : "block" }} // Ẩn nút khi ở trang đầu tiên
          >
            <img 
            className="ic_transition_arr_swiper" alt="icons" src={ic_arr_left_transition_swiper}/>
          </button>}
          <Swiper
            pagination={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper_view"
            ref={swiperRef} // Gán ref vào Swiper
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
              <img src={view1} alt="images view" className="dialog_view_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={view2} alt="images view" className="dialog_view_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={view3} alt="images view" className="dialog_view_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={view4} alt="images view" className="dialog_view_image" />
            </SwiperSlide>
          </Swiper>
          
         { currentIndex == 3 ? <div className="draf_container"></div>:
             <button
             className="button_transition_swiper"
             onClick={() => swiperRef.current.swiper.slideNext()} // Chuyển đến slide tiếp theo
          style={{ display: currentIndex === 3  ? "none" : "block" }}  >
             <img 
             // Ẩn nút khi ở trang đầu tiên
             className="ic_transition_arr_swiper" 
             alt="icons" src={ic_arr_right_transition_swiper}/>
           </button>       
         }     
        </div>
        <button className="button_next_reservation" onClick={onClose}>
          NEXT
        </button>
      </div>
    </div>
  );
};

DialogChooseView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default DialogChooseView;
