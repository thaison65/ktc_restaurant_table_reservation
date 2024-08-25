import { useState, useEffect, useCallback} from "react";
import DialogCalendar from "./DialogCalendar";
import DialogChooseView from "./DialogChooseView";
import DialogFillInformation from "./DiaLogFillInformation";
import PropTypes from "prop-types";

import { API_URL } from '../../../assets/config/config_url';

function ContentDescriptionView({ id, name, description }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);// set trạng thái cho dialog chọn ngày
  const [isOpenDialogViews, setIsOpenDialogViews] = useState(false);// set trạng thái cho dialog chọn view
  const [isOpenDialogFill, setIsOpenDialogFill] = useState(false); // set trạng thái cho dialog điền thông tin
  const [dataView, setDataView] = useState({}); // danh sách các view trong theo loại
  const [listViewAvailable, setListViewAvailable] = useState([]); // danh sách các view trong được call API theo ngày 
  const [selectedDate, setSelectedDate] = useState(null); // ngày chọn booking
  const [selectedImg, setSelectedImg] = useState(null); // view chọn booking

  // hàm chọn ngày
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  //hàm chọn view
  const handleImgSelect = (img) => {
    setSelectedImg(img);
  };

  //hàm danh sách bàn trống theo ngày được trả về từ dialog chọn ngày
  const handleListViewAvailable = (list) => {
    setListViewAvailable(list);
  };

  //hàm đóng dialog chọn view và trở về dialog chọn ngày
  const backDialogView = useCallback(() => {
    setIsOpenDialogViews(false);
    setIsOpenDialog(true);
  }, []);

  //hàm chọn view được truyền từ dialog chọn view
  const CloseDialogChossView = useCallback(() =>{
    setIsOpenDialogViews(false);
  })
  //Hàm đóng view điền thông tin booking
  const CloseDialogFillIC = useCallback(() => {
    setIsOpenDialogFill(false);
  }, []);
  //hàm mở dialog chọn ngày
  const OpenDialogCalendar = useCallback(() => {
    setIsOpenDialog(true);
  }, []);

  //hàm chuyển từ dialog chọn ngày - > chọn view
  const CloseDialogCalendar = useCallback(() => {
    setIsOpenDialog(false);
    setIsOpenDialogViews(true);
  }, []);

  // hàm chuyển từ dialog view -> điền thông tin
  const CloseDialogViews = useCallback(() => {
    setIsOpenDialogViews(false);
    setIsOpenDialogFill(true);
  }, []);

  // Đóng thông tin khách hàng và gửi request
  const CloseDialogFill = useCallback(() => {
    setIsOpenDialogFill(false);
  }, []);

  //lấy danh sách bàn theo view
  useEffect(() => {
    const getView = async () => {
      const url = `${API_URL}category/getViews/${id}`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        });
        if (!res.ok) {
          throw new Error(`Fetch data error: ${res.status}`);
        }
        const json = await res.json();
        setDataView(json.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getView();
  }, [id]);

  return (
    <div className="container_content_description_view">
      {dataView ? (
        <>
          <p className="title_content_view">{name}</p>
          <div className="container_description_content_view">
            <p className="description_content_view_more">{description}</p>
          </div>
          <p className="text_for_require">For all enquiries, please email</p>
          <p className="text_email">info@groupsixrestaurant.com</p>
          <div className="container_btn_ic">
            <button
              className="button_booking_view_more"
              onClick={OpenDialogCalendar}
            >
              Book Now
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <DialogCalendar
        isOpen={isOpenDialog} // mở dialog
        onClose={CloseDialogCalendar}// đóng dialog
        title="Restaurant Experience" // tile dialog 
        onListViewAvailable={handleListViewAvailable} // danh sách bàn có sẵn cho từng view theo ngày
        onDateSelect={handleDateSelect} // truyền ngày được chọn cho contentdescription view
        id={id} // truyền id view cho dialog
      >
        <p>
          All payments for tickets purchased are fixed and final. The Restaurant
          Experience has a policy of no refunds and cancellations.
        </p>
      </DialogCalendar>
      <DialogChooseView
        isOpen={isOpenDialogViews}
        onClose={CloseDialogViews}
        title={"Choose View"}
        listViewAvailable={listViewAvailable} // danh sách bàn có sẵn cho từng view theo ngày
        backDialog={backDialogView} // hàm cho chuyển từ dilaog view -> chọn ngày
        onImgSelect={handleImgSelect} // chuyền id bàn được chọn
        closeDialog={CloseDialogChossView}// đóng dialog
      ></DialogChooseView>
      <DialogFillInformation
        isOpen={isOpenDialogFill} // mở dialog
        isClose={CloseDialogFill} // đóng dialog
        title={"Provide Your Details"} // title
        closeDialog={CloseDialogFillIC} // hàm cho icon đóng dialog
        idCategorySelected={selectedImg} // id bàn được chon
        dateSelected={selectedDate}// id ngày được chọn
      ></DialogFillInformation>
    </div>
  );
}

ContentDescriptionView.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}; //truyền dữ liệu sang diff component cho dialog

export default ContentDescriptionView;
