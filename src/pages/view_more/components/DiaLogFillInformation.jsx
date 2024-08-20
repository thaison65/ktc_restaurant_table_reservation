import { PropTypes } from "prop-types";
import { useState } from "react";

const DialogFillInformation = ({ title, isOpen, isClose }) => {
  const [phone, setPhone] = useState('');
  if (!isOpen) return null;
  

  const handleChange = (event) => {
    const input = event.target.value;
    const onlyNumbers = input.replace(/[^0-9]/g, ''); // Loại bỏ ký tự không phải số
    setPhone(onlyNumbers);
  };
  return (
    <div className="container_form_customer">
      <div className="dialog_fill_information">
        <h2>{title}</h2>
        <form id="myFrom">
          <div className="form_group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nhập tên của bạn"
              required
            />
          </div>
          <div className="container_gr_email_phone">
            <div className="form_group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
          </div>

          <div className="form_group">
            <label htmlFor="number_of_people">People:</label>
            <input
              type="number"
              id="number_of_people"
              name="number_of_people"
              min="1"
              placeholder="Nhập số người tham dự"
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="arrival_time">Arrived time:</label>
            <input
              type="time"
              id="arrival_time"
              name="arrival_time"
              className="arrival_time"
              required
            />
          </div>

        {/*   <div className="form_group">
            <label htmlFor="duration">Expect time(hour):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              placeholder="Nhập thời gian dự kiến"
              required
            />
          </div> */}
        </form>
        <div className="container_note">
          <p>
            Please ensure that your information is as accurate as possible so we
            can serve you better. Kindly double-check everything.
          </p>
        </div>
        <div className="container_button">
          <button className="button_next_reservation" onClick={isClose}>
            BOOKING
          </button>
        </div>
      </div>
    </div>
  );
};

DialogFillInformation.propTypes = {
  title: PropTypes.String,
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
};

export default DialogFillInformation;
