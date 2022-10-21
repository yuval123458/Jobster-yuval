import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import logo from "../assets/images/logo.svg";
import { SideBarToggle } from "../reducers/user-slice";
import { Logout } from "../reducers/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          onClick={() => dispatch(SideBarToggle())}
          className="toggle-btn"
          type="button"
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            onClick={() => setShowLogout((prev) => !prev)}
            type="button"
            className="btn"
          >
            <FaUserCircle />
            {user ? user.name : "Guest"}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              onClick={() => dispatch(Logout())}
              className="dropdown-btn"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
