import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
function CardViewLeft({ id, name, description, imageSrc }) {
  
  const [inProp, setInProp] = useState(false);
  const navigate = useNavigate();

  //chuyển sang trang view more kèm theo id của hình đã gửi 
  const handleClick = () => {
    navigate("/viewMorePage", {state : {id}});
  };

  //set In Prop để bắt đầu cho chuyển động transition 
  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <CSSTransition
      in={inProp}
      timeout={12000}
      classNames="card_view_left_transition"
      mountOnEnter
    >
      <div className="container_description_img_view_left">
        <div className="container_image_view_left">
          <img className="img_card_view_left" alt="image view" src={imageSrc} />
        </div>
        <div className="container_description_view_left">
          <p className="text_name_view_left">{name}</p>
          <p className="text_description_view_left">{description}</p>
          <button className="button_booking_left" onClick={handleClick}>
            BOOKING
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

CardViewLeft.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default CardViewLeft;
