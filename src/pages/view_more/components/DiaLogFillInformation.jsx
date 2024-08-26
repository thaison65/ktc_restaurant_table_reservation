import PropTypes from 'prop-types';
import { useState } from 'react';
import ic_close from '../../../assets/icons/ic_close.svg';
import { API_URL } from '../../../assets/config/config_url';
import swal from 'sweetalert';
const DialogFillInformation = ({
  title,
  isOpen,
  isClose,
  closeDialog,
  idCategorySelected, // nhận id view được chọn
  dateSelected, // nhận ngày được chọn
}) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numberPerson, setNumberPerson] = useState(1);
  const [additionNote, setAdditionNote] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null; // tránh re-reder lại khi isopen false

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePhone = (event) => {
    const input = event.target.value;
    //validate phone chỉ nhập số
    setPhone(input.replace(/[^0-9]/g, ''));
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNumberPerson(event.target.value);
  };

  const handleChangeAdditionNote = (event) => {
    setAdditionNote(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      // name không rống
      newErrors.name = 'Name cannot be empty';
    }

    if (!phone.trim()) {
      // phone không rỗng
      newErrors.phone = 'Phone cannot be empty';
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      // email đúng định dạng
      newErrors.email = 'Invalid email format';
    }
    if (Number(numberPerson) <= 0) {
      // person là số , không âm, khác 0
      newErrors.numberPerson = 'Number of people must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = () => {
    console.log({
      name: name,
      phone: phone,
      email: email,
      addition_note: additionNote,
      numberPerson: numberPerson,
      view_id: idCategorySelected,
      booking_date: dateSelected.toISOString(),
    });
    if (!validateForm()) return;
    fetch(`${API_URL}booking/add-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        addition_note: additionNote,
        numberPerson: numberPerson,
        view_id: idCategorySelected,
        booking_date: dateSelected.toISOString(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('False Fetch API POst Request:' + response.status);
        }
        return response.json();
      })
      .then(() => {
        setName(''),
          setPhone(''),
          setEmail(''),
          setAdditionNote(''),
          setNumberPerson(1),
          swal('Good job!', 'Thank you for your interest in our service. We will respond to you as quickly as possible via email.', 'success');
        isClose(); //đóng dialog
      })
      .catch((error) => {
        console.error('Error False Fetch API POst Request:', error);
        alert('Something wrong');
      });
  };

  return (
    <div className='container_form_customer'>
      <div className='dialog_fill_information'>
        <div className='container_header_dialog_icon'>
          <button onClick={closeDialog}>
            <img src={ic_close} alt='icon' />
          </button>
        </div>
        <form id='myForm'>
          <h2>{title}</h2>
          <div className='form_group'>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' name='name' value={name} placeholder='Nhập tên của bạn' onChange={handleChangeName} required />
            {errors.name && <span className='error'>{errors.name}</span>}
          </div>
          <div className='container_gr_email_phone'>
            <div className='form_group'>
              <label htmlFor='phone'>Phone:</label>
              <input type='text' id='phone' name='phone' placeholder='Nhập số điện thoại' value={phone} onChange={handleChangePhone} required />
              {errors.phone && <span className='error'>{errors.phone}</span>}
            </div>

            <div className='form_group'>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' value={email} placeholder='Nhập email của bạn' onChange={handleChangeEmail} required />
              {errors.email && <span className='error'>{errors.email}</span>}
            </div>
          </div>

          <div className='form_group'>
            <label htmlFor='number_of_people'>People:</label>
            <input
              type='number'
              id='number_of_people'
              name='number_of_people'
              min='1'
              value={numberPerson}
              onChange={handleChangeNumber}
              placeholder='Nhập số người tham dự'
              required
            />
            {errors.numberPerson && <span className='error'>{errors.numberPerson}</span>}
          </div>

          <div className='form_group'>
            <label htmlFor='addition_note'>Additional Note:</label>
            <input
              type='text'
              id='addition_note'
              name='addition_note'
              value={additionNote}
              placeholder='Nhập ghi chú bổ sung (nếu có)'
              onChange={handleChangeAdditionNote}
            />
          </div>
        </form>
        <div className='container_note'>
          <p>Please ensure that your information is as accurate as possible so we can serve you better. Kindly double-check everything.</p>
        </div>
        <div className='container_button'>
          <button className='button_next_reservation' onClick={handleBooking}>
            BOOKING
          </button>
        </div>
      </div>
    </div>
  );
};

DialogFillInformation.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
  closeDialog: PropTypes.func,
  idCategorySelected: PropTypes.string.isRequired,
  dateSelected: PropTypes.string.isRequired,
};

export default DialogFillInformation;
