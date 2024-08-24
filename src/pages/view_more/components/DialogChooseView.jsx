import { useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ic_arr_left_transition_swiper from "../../../assets/icons/arr_transition_left.svg";
import ic_arr_right_transition_swiper from "../../../assets/icons/arr_transition_right.svg";
import ic_close_dialog from '../../../assets/icons/ic_close.svg'
const DialogChooseView = ({
  isOpen,
  onClose,
  title,
  listViewAvailable,
  backDialog,
  onImgSelect,
  closeDialog
}) => {
  const swiperRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handleNext = () => {
    const selectedView = listViewAvailable[currentIndex];
    setCurrentIndex(0);
    if (selectedView) {
      const selectedViewId = selectedView.id;
      onImgSelect(selectedViewId);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="container_header_dialog">
          <button onClick={backDialog}>
            <img src={ic_arr_left_transition_swiper} alt="icon" />
          </button>
          <button onClick={closeDialog}>
            <img src={ic_close_dialog} alt="icon" />
          </button>
        </div>
        <h2>{title}</h2>
        <div className="container_content_dialog_view">
          <button
            className="button_transition_swiper"
            onClick={() => swiperRef.current.swiper.slidePrev()}
            style={{
              visibility: currentIndex > 0 ? "visible" : "hidden",
            }}
          >
            <img
              className="ic_transition_arr_swiper"
              alt="icons"
              src={ic_arr_left_transition_swiper}
            />
          </button>
          <Swiper
            pagination={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper_view"
            ref={swiperRef}
            onSlideChange={handleSlideChange}
          >
            {listViewAvailable.length > 0 ? (
              listViewAvailable.map((view, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={view.desk_img}
                    alt={`View ${index + 1}`}
                    className="dialog_view_image"
                  />
                </SwiperSlide>
              ))
            ) : (
              <div className="div_no_view">
                <p className="p_no_view">view has no tables available.</p>
              </div>
            )}
          </Swiper>
          <button
            className="button_transition_swiper"
            onClick={() => swiperRef.current.swiper.slideNext()}
            style={{
              visibility:
                currentIndex < listViewAvailable.length - 1
                  ? "visible"
                  : "hidden",
            }}
          >
            <img
              className="ic_transition_arr_swiper"
              alt="icons"
              src={ic_arr_right_transition_swiper}
            />
          </button>
        </div>
        <button 
         disabled={listViewAvailable.length === 0}
        className="button_next_reservation" onClick={handleNext}>
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
  listViewAvailable: PropTypes.array.isRequired,
  backDialog: PropTypes.func,
  onImgSelect: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default DialogChooseView;
