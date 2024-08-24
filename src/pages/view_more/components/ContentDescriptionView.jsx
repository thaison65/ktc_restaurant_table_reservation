import { useState, useEffect, useCallback} from "react";
import DialogCalendar from "./DialogCalendar";
import DialogChooseView from "./DialogChooseView";
import DialogFillInformation from "./DiaLogFillInformation";
import swal from "sweetalert";
import PropTypes from "prop-types";

import { API_URL } from '../../../assets/config/config_url';

function ContentDescriptionView({ id, name, description }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogViews, setIsOpenDialogViews] = useState(false);
  const [isOpenDialogFill, setIsOpenDialogFill] = useState(false);
  const [dataView, setDataView] = useState({});
  const [listViewAvailable, setListViewAvailable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleImgSelect = (img) => {
    setSelectedImg(img);
  };

  const handleListViewAvailable = (list) => {
    setListViewAvailable(list);
  };

  const backDialogView = useCallback(() => {
    setIsOpenDialogViews(false);
    setIsOpenDialog(true);
  }, []);

  const CloseDialogChossView = useCallback(() =>{
    setIsOpenDialogViews(false);
  })
  const CloseDialogFillIC = useCallback(() => {
    setIsOpenDialogFill(false);
  }, []);

  const OpenDialogCalendar = useCallback(() => {
    setIsOpenDialog(true);
  }, []);

  const CloseDialogCalendar = useCallback(() => {
    setIsOpenDialog(false);
    setIsOpenDialogViews(true);
  }, []);

  const CloseDialogViews = useCallback(() => {
    setIsOpenDialogViews(false);
    setIsOpenDialogFill(true);
  }, []);

  const CloseDialogFill = useCallback(() => {
    setIsOpenDialogFill(false);
    swal(
      "Good job!",
      "Thank you for your interest in our service. We will respond to you as quickly as possible via email.",
      "success"
    );
  }, []);

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
        isOpen={isOpenDialog}
        onClose={CloseDialogCalendar}
        title="Restaurant Experience"
        onListViewAvailable={handleListViewAvailable}
        onDateSelect={handleDateSelect}
        id={id}
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
        listViewAvailable={listViewAvailable}
        backDialog={backDialogView}
        onImgSelect={handleImgSelect}
        closeDialog={CloseDialogChossView}
      ></DialogChooseView>
      <DialogFillInformation
        isOpen={isOpenDialogFill}
        isClose={CloseDialogFill}
        title={"Provide Your Details"}
        closeDialog={CloseDialogFillIC}
        idCategorySelected={selectedImg}
        dateSelected={selectedDate}
      ></DialogFillInformation>
    </div>
  );
}

ContentDescriptionView.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ContentDescriptionView;
