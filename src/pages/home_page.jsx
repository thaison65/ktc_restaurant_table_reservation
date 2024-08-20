import Header from './home_page/components/Header'
import ImageHeaderSwiper from './home_page/components/ImageSwiperSlide'

import CardWelcome from './home_page/components/CardWelcome'
import CardViewRight from './home_page/components/CardViewRight'
import CardViewLeft from './home_page/components/CardViewLeft'




import view1 from '../assets/images/img_view1.jpg'
import view3 from '../assets/images/img_view3.jpg'
import view5 from '../assets/images/img_view5.jpg'

import view2 from '../assets/images/img_view2.jpg'
import view4 from '../assets/images/img_view4.jpg'
import view6 from '../assets/images/img_view6.jpg'
import FooterHome from "./home_page/components/Footer";

import './home_page/css_home_page.css';

function HomePage() { 
  return (
    <>
    <Header/>
    <ImageHeaderSwiper/>
    <CardWelcome/>
    <CardViewRight
       name="Seaside Panorama Table"
       description="Table offers an unobstructed view of the ocean, creating a serene and picturesque dining experience with the endless horizon as your backdrop."
       imageSrc={view1}/>
       <CardViewLeft
       name="Seaside Panorama Table"
       description="Table offers an unobstructed view of the ocean, creating a serene and picturesque dining experience with the endless horizon as your backdrop."
       imageSrc={view2}/>
       <CardViewRight
       name="Seaside Panorama Table"
       description="Table offers an unobstructed view of the ocean, creating a serene and picturesque dining experience with the endless horizon as your backdrop."
       imageSrc={view3}/>
       <CardViewLeft
       name="Seaside Panorama Table"
       description="Table offers an unobstructed view of the ocean, creating a serene and picturesque dining experience with the endless horizon as your backdrop."
       imageSrc={view4}/>
       <CardViewRight
       name="Seaside Panorama Table"
       description="Table offers an unobstructed view of the ocean, creating a serene and picturesque dining experience with the endless horizon as your backdrop."
       imageSrc={view5}/>
       <CardViewLeft
       name="Seaside Panorama Table"
       description="Table offers an unobstructed view of the ocean, creating a serene and picturesque dining experience with the endless horizon as your backdrop."
       imageSrc={view6}/>
      <FooterHome/>
    </>
  );
}

export default HomePage;
