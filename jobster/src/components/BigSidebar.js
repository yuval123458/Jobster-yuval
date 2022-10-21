import Wrapper from "../assets/wrappers/BigSidebar";
import { GoGraph } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { FaWpforms } from "react-icons/fa";
import { ImParagraphCenter } from "react-icons/im";
import { SideBarToggle } from "../reducers/user-slice";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const BigSidebar = () => {
  const sidebar = useSelector((state) => state.user.sideBarOpen);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          sidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <main className="nav-links">
            <NavLink
              to="/"
              end
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

export default BigSidebar;
