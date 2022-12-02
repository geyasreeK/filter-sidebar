import "./Header.css";
import DownArrow from "../svgs/DownArrow";
import Frame from "../svgs/Frame";
import SettingsIcon from "../svgs/SettingsIcon";

function Header() {

  return (
    <header>
      <div className="container">
        <div className="side-modal-heading">
          <Frame />
          <div className="side-heading">
            <span className="side-heading-text">Source: Support</span>
            <DownArrow />
          </div>
        </div>
        <div className="main-headings">
          <div className="m-heading summary">
            Summary
            <div className="underline"></div>
          </div>
          <div className="m-heading">Discover</div>
        </div>
        <div className="settings-icon">
          <SettingsIcon />
        </div>
      </div>
    </header>
  );
}

export default Header;
