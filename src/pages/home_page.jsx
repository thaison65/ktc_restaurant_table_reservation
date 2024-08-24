import Header from "./home_page/components/Header";
import ImageHeaderSwiper from "./home_page/components/ImageSwiperSlide";

import CardWelcome from "./home_page/components/CardWelcome";
import CardViewRight from "./home_page/components/CardViewRight";
import CardViewLeft from "./home_page/components/CardViewLeft";
import FooterHome from "./home_page/components/Footer";

import view1 from "../assets/images/img_view1.jpg";
import view2 from "../assets/images/img_view2.jpg";
import "./home_page/css_home_page.css";

import { useEffect, useState } from "react";

function HomePage() {
  const [dataCatagories, setCategories] = useState(null);
  useEffect(() => {
    async function getCategories() {
      const url = "https://3806-58-187-122-34.ngrok-free.app/category/all";
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
        });
        if (!res.ok) {
          throw new Error(`Fetch data error: ${res.status}`);
        }
        const json = await res.json();
        setCategories(json);
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
    }
    //kiểm tra dữ liệu fetch xong chưa nếu chưa thì gọi lại.
    if (dataCatagories == null) {
      getCategories();
    }
  }, [dataCatagories]);
  return (
    <>
      {dataCatagories && dataCatagories.length > 0 ? (
        <div className="container_content_main_home">
          <Header />
          <div className="container_swiper">
            <ImageHeaderSwiper />
          </div>
          <CardWelcome />
          {dataCatagories.map((category, index) => {
            return index % 2 == 0 ? (
              <CardViewRight
                id={category.id}
                name={category.name}
                description={category.description}
                imageSrc={view1}
              />
            ) : (
              <CardViewLeft
                id={category.id}
                name={category.name}
                description={category.description}
                imageSrc={view2}
              />
            );
          })}
          <FooterHome />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default HomePage;
