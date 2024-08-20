import ic_facebook from '../../../assets/icons/ic_facebook.svg';
import ic_instagram from '../../../assets/icons/ic_instagram.svg';
import ic_tiktok from  '../../../assets/icons/ic_tiktok.svg';

function FooterViewMorePage(){
    return(
        <footer className="footer_home">
            <div className="container_footer_address">
                <p className='text_phone_number'>0838 090 314</p>
                <p className='text_email'>restaurant@gmail.com</p>
                <p className='text_address'>
                5123 Market St. #22B 
                Charlottesville, California 44635
                </p>
                <p>&copy; 2020 Lift Media. All rights reserved.</p>
            </div>

            <div className="container_footer_social_media">
                <img className='img_icon_social_media' alt='facebook social' src={ic_facebook}></img>
                <img className='img_icon_social_media' alt='facebook social' src={ic_instagram}></img>
                <img className='img_icon_social_media' alt='facebook social' src={ic_tiktok}></img>
            </div>  
        </footer>
    );
}

export default FooterViewMorePage;