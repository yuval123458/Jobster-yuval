import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { FaWpforms } from "react-icons/fa";
import { ImParagraphCenter } from "react-icons/im";
import { SideBarToggle } from "../reducers/user-slice";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SmallSidebar = () => {
  const sidebar = useSelector((state) => state.user.sideBarOpen);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          sidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            onClick={() => dispatch(SideBarToggle())}
            className="close-btn"
          >
            <FaTimes />
          </button>
          <div>
            <Logo />
          </div>

          <main className="nav-links">
            <NavLink
              to="/"
              end
              onClick={() => dispatch(SideBarToggle())}
              className={(props) => {
                if (props.isActive) {
                  return "nav-link active";
                } else {
                  return "nav-link";
                }
              }}
            >
              <GoGraph className="icon" />
              Stats
            </NavLink>
            <NavLink
              onClick={() => dispatch(SideBarToggle())}
              to="/all-jobs"
              className={(props) => {
                if (props.isActive) {
                  return "nav-link active";
                } else {
                  return "nav-link";
                }
              }}
            >
              <ImParagraphCenter className="icon" />
              All Jobs
            </NavLink>
            <NavLink
              state={{ edit: false }}
              onClick={() => dispatch(SideBarToggle())}
              to="/add-jobs"
              className={(props) => {
                if (props.isActive) {
                  return "nav-link active";
                } else {
                  return "nav-link";
                }
              }}
            >
              <FaWpforms className="icon" />
              Add Job
            </NavLink>
            <NavLink
              onClick={() => dispatch(SideBarToggle())}
              to="/profile"
              className={(props) => {
                if (props.isActive) {
                  return "nav-link active";
                } else {
                  return "nav-link";
                }
              }}
            >
              <ImProfile className="icon" />
              Profile
            </NavLink>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
