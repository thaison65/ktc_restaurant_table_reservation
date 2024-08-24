import { useLocation } from "react-router-dom";
import ContentDescriptionView from "./view_more/components/ContentDescriptionView";
import FooterViewMorePage from "./view_more/components/Footer";
import Header from "./view_more/components/Header";
import ImageViewSwiper from "./view_more/components/ImageViewSwiperSlide";

import "./view_more/css_view_more.css";

function ViewMorePage() {
  const location = useLocation();
  const { id, name, description } = location.state || {};
  return (
    <>
      <div className="container_content_main_home">
        <Header />
        <div className="container_swiper">
          <ImageViewSwiper id={id} />
        </div>
        <ContentDescriptionView id={id} name={name} description={description} />
        <FooterViewMorePage />
      </div>
    </>
  );
}

export default ViewMorePage;
