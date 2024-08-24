import { PropTypes } from "prop-types";
import { useState } from "react";

import ic_close from "../../../assets/icons/ic_close.svg";
const DialogFillInformation = ({ title, isOpen, isClose, closeDialog}) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numberPerson, setNumberPerson] =useState(1);
  if (!isOpen) return null;

  const handleChangeName = (event) => {
    const input = event.target.value;
    setName(input)
  };
  const handleChangePhone = (event) => {
    const input = event.target.value;
    const onlyNumbers = input.replace(/[^0-9]/g, ""); // Loại bỏ ký tự không phải số
    setPhone(onlyNumbers);
  };
  const handleChangeEmail = (event) => {
    const input = event.target.value;
      setEmail(input)
  };

  const handleChangeNumber = (event) =>{
    const input = event.target.value;
    setNumberPerson(input)
  }
  return (
    <div className="container_form_customer">
      <div className="dialog_fill_information">
        <div className="container_header_dialog_icon">
          <button onClick={closeDialog}>
            <img src={ic_close} alt="icon" />
          </button>
        </div>

        <form id="myFrom"> <h2>{title}</h2>
          <div className="form_group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Nhập tên của bạn"
              onChange={handleChangeName}
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
                onChange={handleChangePhone}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Nhập email của bạn"
                onChange={handleChangeEmail}
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
              value={numberPerson}
              onChange={handleChangeNumber}
              placeholder="Nhập số người tham dự"
              required
          
            />
          </div>
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
  closeDialog: PropTypes.func,
};

export default DialogFillInformation;
