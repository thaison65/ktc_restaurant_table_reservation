import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from "../../../assets/config/config_url";
const DialogCalendar = ({
  isOpen,
  onClose,
  title,
  children,
  onListViewAvailable,
  onDateSelect,
  id,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchAvailableView = useCallback(async () => {
    const url = `${API_URL}views/views-available`;
    const params = {
      date_search: `${selectedDate.toISOString()}`,
      category_id: id,
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
        throw new Error(`Fetch data error: ${res.status}`);
      }

      const json = await res.json();
      onListViewAvailable(json.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const handleDateChange = useCallback(
    (date) => {
      setSelectedDate(date);
      fetchAvailableView(date);
      onDateSelect(date);
    },
    [fetchAvailableView, onDateSelect]
  );

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
  onListViewAvailable: PropTypes.func.isRequired,
  onDateSelect: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

DialogCalendar.defaultProps = {
  title: "Default Title",
};

export default DialogCalendar;
