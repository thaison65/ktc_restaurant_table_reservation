import ContentDescriptionView from "./view_more/components/ContentDescriptionView";
import FooterViewMorePage from "./view_more/components/Footer";
import Header from "./view_more/components/Header";
import ImageViewSwiper from "./view_more/components/ImageViewSwiperSlide";

import './view_more/css_view_more.css'

function ViewMorePage(){
    return (
        <>
        <Header/>
       <ImageViewSwiper/>
       <ContentDescriptionView/>
       <FooterViewMorePage/>
        </>
    );
}

export default ViewMorePage;