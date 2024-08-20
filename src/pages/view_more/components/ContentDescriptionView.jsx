import { useState, useEffect } from "react";
import imgView from "../../../assets/images/img_view1.jpg";
import icArrRight from "../../../assets/icons/ic_arrow_right.svg";
import DialogCalendar from './DialogCalendar';
import DialogChooseView from "./DialogChooseView";
import DialogFillInformation from "./DiaLogFillInformation";
import swal from "sweetalert";
function ContentDescriptionView() {
  const text = `The Ocean Breeze Table is perfectly positioned by a large window, offering stunning panoramic views of the vast sparkling blue sea. The gentle sea breezes flow through, enhancing the tranquil and serene ambiance of your dining experience. As you enjoy your meal, you will be captivated by the endless horizon and the rhythmic sound of the waves. This ideal location provides a sense of calm and relaxation, allowing you to fully immerse yourself in the beauty of the ocean while savoring each bite. Whether for a romantic dinner or a peaceful meal with friends, the Ocean Breeze Table offers a truly memorable experience.`;

  const [displayedText, setDisplayedText] = useState(""); //Hiển thị từng chữ cái
  const [index, setIndex] = useState(0); // chỉ số thứ tự của chữ
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogViews, setIsOpenDialogViews] = useState(false);
  const [isOpenDialogFill, setIsOpenDialogFill] = useState(false);

  const OpenDialogCalendar = () => {
    setIsOpenDialog(true);
    
};
  const CloseDialogCalendar = () => {
    setIsOpenDialog(false);
    setIsOpenDialogViews(true);
  };
   
  const CloseDialogViews = () =>{
    setIsOpenDialogViews(false);
    setIsOpenDialogFill(true);
  }

  const CloseDialogFill = () =>{
    setIsOpenDialogFill(false);
    swal("Good job!","Thank you for your interest in our service. We will respond to you as quickly as possible via email.", "success");
  }

  useEffect(() => {
    if (index >= text.length) return; // không load lại nếu đã hết nội dung

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1)); // Hiển thị từng chữ cái
      setIndex((prevIndex) => prevIndex + 1); // cập nhật chỉ dố từ
    }, 20); // Tốc độ hiển thị

    return () => clearInterval(interval);
  }, [index, text]);
  return (
    <div className="container_content_description_view">
      <p className="title_content_view">Ocean Breeze Table</p>
      <div className="container_description_content_view">
        <p className="description_content_view">{displayedText}</p>
      </div>
      <p className="text_for_require">For all enquiries, please email</p>
      <p className="text_email">info@oceanbreezerestaurant.com</p>
      <div className="container_image_view">
        <img className="image_view" alt="image view" src={imgView} />
      </div>
      <div className="container_btn_ic">
        <button className="button_booking_view_more" onClick={OpenDialogCalendar}>
          Book Now
        </button>
        <img src={icArrRight} alt="icon arrow" />
      </div>
      <DialogCalendar isOpen={isOpenDialog} onClose={CloseDialogCalendar} title="Restaurant Experience">
        <p>All payments for tickets purchased are fixed and final. The Restaurant Experience has a policy of no refunds and cancellations.</p>
      </DialogCalendar>
      <DialogChooseView
        isOpen={isOpenDialogViews}
        onClose={CloseDialogViews}
        title={"Choose View"}
      ></DialogChooseView>
      <DialogFillInformation
      isOpen={isOpenDialogFill}
      isClose={CloseDialogFill}
      title={"Provide Your Details"}
      >
      </DialogFillInformation>
    </div>
  );
}

export default ContentDescriptionView;
