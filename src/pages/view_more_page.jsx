import { useLocation } from "react-router-dom";
import ContentDescriptionView from "./view_more/components/ContentDescriptionView";
import FooterViewMorePage from "./view_more/components/Footer";
import Header from "./view_more/components/Header";
import ImageViewSwiper from "./view_more/components/ImageViewSwiperSlide";
import { API_URL } from "../assets/config/config_url";
import "./view_more/css_view_more.css";
import { useEffect, useState } from "react";

function ViewMorePage() {
  const location = useLocation(); // truy câp đường dẫn lấy thông tin pathname, search, hash dùng để liên kết các nội dụng giữa các component
  const { id, name, description } = location.state || {}; // nhận data từ homepage khi bấm booking 
  const [dataView, setDataView] = useState([]); // danh sách view
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
          throw new Error(`Danh sách bàn theo ID View : ${res.status}`);
        }
        const json = await res.json();
        setDataView(json.data);
      } catch (error) {
        console.error( "Danh sách bàn theo ID",error.message);
      }
    };
    getView();
  }, [id]);
  return (
    
    <>
      <div className="container_content_main_home">
        <Header />
        {dataView.length > 0 ? (
        <>
          <div className="container_swiper">
            <ImageViewSwiper dataView={dataView} id={id} />
          </div>
          <ContentDescriptionView id={id} name={name} description={description} />
        </>
      ) : (
        <div className="container_for_no_view_available">

        Unfortunately, no reservations are available at the moment. Please choose another view.
        </div>
      )}
        <FooterViewMorePage />
      </div>
    </>
  );
}

export default ViewMorePage;
