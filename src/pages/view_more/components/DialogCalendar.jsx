import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DialogCalendar = ({ isOpen, onClose, title, children, onListViewAvailable, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
 /*  const [listViewAvailable, setListViewAvailable] = useState([]) */;
//Dang test
  const fetchAvailableView = useCallback(async () => {
    const url = new URL('https://66c603f4134eb8f4349677b7.mockapi.io/views/views-availible');
    const params = {
      date_search: '2024-08-24T00:00.000Z',
      category_id: 2
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Fetch data error: ${res.status}`);
      }
      const json = await res.json();
      onListViewAvailable(json);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
    fetchAvailableView(date);
    onDateSelect(date);
    console.log(date)
  }, [fetchAvailableView, onDateSelect]);

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
          minDate={new Date()}
          className="date_picker"
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
        {selectedDate && (
          <div>
            <p>{selectedDate.toDateString()}</p>
          </div>
        )}
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
  onListViewAvailable: PropTypes.func.isRequired, // Đảm bảo onListViewAvailable là một hàm
  onDateSelect: PropTypes.func.isRequired, 
};

DialogCalendar.defaultProps = {
  title: "Default Title",
};

export default DialogCalendar;
