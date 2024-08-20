import icUser from "../../../assets/icons/ic_user.svg";

function Header() {
  return (
    <header className="header-home">
      <p className="header-home-p">Restaurant</p>

      <div className="gr-nav-home">
        <nav>
          <ul>
            <li>
              <a  href="#">About</a>
            </li>
            <li>
              <a href="#">Chef</a>
            </li>
            <li>
              <a href="/">Views</a>
            </li>
            <li>
              <a href="#">Carrier</a>
            </li>
          </ul>
        </nav>
        <div className="container_icon_user">
          <img alt="icon user" src={icUser}></img>
        </div>
      </div>
    </header>
  );
}

export default Header;
