import ic_facebook from "../../../assets/icons/ic_facebook.svg";
import ic_instagram from "../../../assets/icons/ic_instagram.svg";
import ic_tiktok from "../../../assets/icons/ic_tiktok.svg";
import ic_phone from "../../../assets/icons/ic_phone.svg";
import ic_gmail from "../../../assets/icons/ic_gmail.svg";
import ic_address from "../../../assets/icons/ic_address.svg";

function FooterHome() {
  return (
    <footer className="footer_home">
      <div className="container_text_icon">
        <img className="img_icon_social_media" alt="phone" src={ic_phone}></img>
        <p className="text_phone_number">0838 090 314</p>
      </div>
      <div className="container_text_icon">
        <img className="img_icon_social_media" alt="gmail" src={ic_gmail}></img>
        <p className="text_email">groupsixrestaurant@gmail.com</p>
      </div>
      <div className="container_text_icon">
        <img
          className="img_icon_social_media"
          alt="address"
          src={ic_address}
        ></img>
        <p className="text_address">
          25, Tower, 9 - 11 Ton Duc Thang, Ben Nghe Q1 TP. HCM
        </p>
      </div>
      <div className="content_copy_write_social">
        <p>&copy; 2020 Lift Media. All rights reserved.</p>
        <div>
          <img
            className="img_icon_social_media"
            alt="facebook social"
            src={ic_facebook}
          ></img>
          <img
            className="img_icon_social_media"
            alt="facebook social"
            src={ic_instagram}
          ></img>
          <img
            className="img_icon_social_media"
            alt="facebook social"
            src={ic_tiktok}
          ></img>
        </div>
      </div>
    </footer>
  );
}

export default FooterHome;
