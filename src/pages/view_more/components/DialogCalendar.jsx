import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from "../../../assets/config/config_url";
const DialogCalendar = ({
  isOpen, // mở dialog chuyển từ contentdescription
  onClose, // đóng dialog
  title, // title
  children, // thẻ con
  onListViewAvailable, // danh sách tróng theo ngày
  onDateSelect, // ngày được chon
  id, // id loại view
}) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  //hàm tìm danh sách bàn trống theo ngày và id được chọn
  const fetchAvailableView = useCallback(async () => {
    const url = `${API_URL}views/views-available`;
    const params = {
      date_search: `${selectedDate.toISOString()}`,// ngày được chon
      category_id: id,// bàn được chọn
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`Lỗi fetch API: ${res.status}`);
      }

      const json = await res.json();
      onListViewAvailable(json.data);// truyền danh sách này cho content để contend truyền cho choose view hiển thị các bàn trống
    } catch (error) {
      console.error("Lỗi API danh sách bàn trống theo ngày và loại view", error.message);
    }
  }, [selectedDate]);

  // hàm thay đổi ngày trong dialog
  const handleDateChange = useCallback(
    (date) => {
      setSelectedDate(date); // set ngày mới chọn
      fetchAvailableView(date);// đồng thời fetch dữ liệu cho ngày mới chọn
      onDateSelect(date); // truyền ngày mới chọn cho content view để content truyền cho request booking
    },
    [fetchAvailableView, onDateSelect] // mảng arr dependece -> khi 2 thằng này thay đổi hàm sẽ đươc gọi lại
  );

  //hàm cho ngày hôm nay
  useEffect(() => {
    if (isOpen) {
      fetchAvailableView(new Date());
    }
  }, [isOpen, fetchAvailableView]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2 className="title_dialog">{title}</h2>
        <div className="dialog-content">{children}</div>
        <DatePicker
          minDate={new Date()}//không chọn ngày quá khứ
          className="date_picker" 
          selected={selectedDate} // truyền ngày được chọn cho content view
          onChange={handleDateChange} //hàm chọn ngày khác
          inline // luôn hiển thị datepicker mà kh cần thao tác
        />
          <div>
            <p>{selectedDate.toDateString()}</p>
          </div>
        <button className="button_next_reservation" onClick={onClose}>
          NEXT
        </button>
      </div>
    </div>
  );
};

DialogCalendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onListViewAvailable: PropTypes.func.isRequired,
  onDateSelect: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

DialogCalendar.defaultProps = {
  title: "Default Title",
};

export default DialogCalendar;
