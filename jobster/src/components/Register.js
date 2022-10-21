import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "./Logo";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, RegisterUser } from "../reducers/user-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user]);

  const { name, email, password, isMember } = values;

  const toggleHandler = () => {
    setValues((prev) => ({
      ...prev,
      isMember: !isMember,
    }));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password || (!isMember && !name)) {
      toast.error("please fill in all required fields");
    }

    if (isMember) {
      dispatch(LoginUser({ email, password }));
      return;
    }
    dispatch(RegisterUser({ name, email, password }));
  };

  const demoHandler = () => {
    dispatch(LoginUser({ email: "testUser@gmail.com", password: "testUser" }));
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler} className="form">
        <Logo />
        <h2 className="title">{isMember ? "Login" : "Register"}</h2>
        {!isMember && (
          <div className="form-row">
            <label className="form-label">Name</label>
            <input
              onChange={changeHandler}
              className="form-input"
              value={name}
              name="name"
            />
          </div>
        )}
        <div className="form-row">
          <label className="form-label">Email</label>
          <input
            onChange={changeHandler}
            className="form-input"
            value={email}
            name="email"
          />
        </div>
        <div className="form-row">
          <label className="form-label">Password</label>
          <input
            onChange={changeHandler}
            className="form-input"
            value={password}
            name="password"
          />
        </div>
        {loading ? (
          <div className="loading loading-center "></div>
        ) : (
          <div className="form-row">
            <button type="submit" className="btn btn-block" disabled={loading}>
              Submit
            </button>
            <button onClick={demoHandler} className="btn btn-hipster btn-block">
              Demo App
            </button>
          </div>
        )}
        {isMember ? (
          <>
            <span>don't have an account yet ? </span>
            <button
              type="button"
              onClick={toggleHandler}
              className="member-btn"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span>Already a member ? </span>
            <button
              type="button"
              onClick={toggleHandler}
              className="member-btn"
            >
              Login
            </button>
          </>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
