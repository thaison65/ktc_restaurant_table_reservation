import { useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ic_arr_left_transition_swiper from "../../../assets/icons/arr_transition_left.svg";
import ic_arr_right_transition_swiper from "../../../assets/icons/arr_transition_right.svg";
import ic_close_dialog from "../../../assets/icons/ic_close.svg";
const DialogChooseView = ({
  isOpen,
  onClose,
  title,
  listViewAvailable, // danh sách bàn trống theo ngày và view được chọn 
  backDialog, // hàm back về dialog chọn ngày từ chọn view
  onImgSelect, // truyền id view được chọn
  closeDialog, // đóng dialog
}) => {
  // sử dụng swiperRef để lưu trữ index swiper để chắc chắn rằng kh cần re-render lại khi thay đổi index swiper 
  const swiperRef = useRef(null);

  //vị trí của swiper 
  const [currentIndex, setCurrentIndex] = useState(0);

  //chuyển slide swiper 
  const handleSlideChange = (swiper) => {
    //lấy vị trí hiện tại
    setCurrentIndex(swiper.activeIndex);
  };

  // button chuyển chọn view sang điền thông tin
  const handleNext = () => {
    const selectedView = listViewAvailable[currentIndex]; // lấy view đã chọn truyền qua gửi request về booking
    setCurrentIndex(0);// resert lại swiper khi tắt hoặc chuyển dialog
    if (selectedView) {
      const selectedViewId = selectedView.id;
      onImgSelect(selectedViewId); // gửi id bàn được chọn về cho booking 
    }
    onClose(); //chuyển dialog , hàm này nhận từ contendescription
  };

  if (!isOpen) return null;// kh re-reder lại khi fase,tránh load trang quá nhiều

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
            /* handle ẩn button left cho trang đầu */
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
            {/* handle cảnh báo rằng đã hết view trống */}
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
              <div className="container_for_no_view_available_dialog">
                Unfortunately, no reservations are available at the moment.
                Please choose another view.
              </div>
            )}
          </Swiper>
          <button
            className="button_transition_swiper"
            onClick={() => swiperRef.current.swiper.slideNext()}
            /* handle ẩn button right khi hết swiper  */
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
        {/* nếu không có view ẩn button */}
        {listViewAvailable.length > 0 && (
          <button className="button_next_reservation" onClick={handleNext}>
            NEXT
          </button>
        )}
      </div>
    </div>
  );
};

DialogChooseView.propTypes = {
  isOpen: PropTypes.bool.isRequired, // mở dialog
  onClose: PropTypes.func.isRequired, 
  title: PropTypes.string,
  listViewAvailable: PropTypes.array.isRequired, // view có sẵn theo ngày và loại viwe
  backDialog: PropTypes.func, // hàm chuyển dialog
  onImgSelect: PropTypes.func.isRequired, //hàm chuyển id view được chọn
  closeDialog: PropTypes.func.isRequired, // hàm đóng dialog
};

export default DialogChooseView;
