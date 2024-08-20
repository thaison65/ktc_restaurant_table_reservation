import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

function CardWelcome() {
  const [inProp, setInProp] = useState(false); // đây là hook ueState để khởi tạo biến

  useEffect(() => {// hook useEffect cập nhật trạng thái dựa trên một điều kiện nhất định 
    setInProp(true); // callback fn, cập nhật lại trạng thái của setInProp
  }, []); // [] được gọi là dependency arr, nếu nó là mảng rỗng, useEffect chỉ chạy lại một lần duy nhât

  return (
    <CSSTransition
      in={inProp} // kiểm tra xem trạng thái có đang hoạt động không
      timeout={12000} // thời gian hiệu ứng transition
      classNames="card_view_welcome_transition"
      unmountOnExit = {true} // xác nhận thành phần sẽ xóa khỏi DOM, nhằm giảm tải cho DOM
    >
      <div className="container_div_home_welcome">
        <div className="container_home_welcome">
          <p className="text_welcome">
            Welcome
          </p>
          <p className="text_description_welcome">
            Welcome to our restaurant! We are committed to bringing you exquisite dishes, attentive service, and a cozy atmosphere, 
            ensuring a wonderful dining experience. We are delighted to have you with us.
          </p>
        </div>
      </div>
    </CSSTransition>
  );
}

export default CardWelcome;
