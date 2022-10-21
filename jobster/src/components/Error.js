import Wrapper from "../assets/wrappers/ErrorPage";
import logo from "../assets/images/not-found.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <img src={logo} alt="not-found-img" />
      <div>
        <h3>Ohh! Page Not Found </h3>
        <p>We can't seem to find the page you are looking for..</p>
        <Link className="" to="/">
          back home
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;
