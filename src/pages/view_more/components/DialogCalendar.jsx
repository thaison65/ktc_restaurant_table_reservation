import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DialogCalendar = ({ isOpen, onClose, title, children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
    if (!isOpen) return null;
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{title}</h2>
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
        <button className="button_next_reservation" onClick={onClose}>NEXT</button>
      </div>
    </div>
  );
};

DialogCalendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

DialogCalendar.defaultProps = {
  title: "Default Title",
};

export default DialogCalendar;
