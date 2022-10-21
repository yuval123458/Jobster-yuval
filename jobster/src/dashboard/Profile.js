import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { ChangeUser } from "../reducers/user-slice";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [usr, setUser] = useState({
    name: user.name.split(" ")[0] ? user.name.split(" ")[0] : user.name,
    lastName: user.name.split(" ")[1] ? user.name.split(" ")[1] : "lastName",
    email: user ? user.email : "",
    location: user ? user.location : "My city",
  });
  const { name, lastName, email, location } = usr;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(ChangeUser(usr));
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler} className="form">
        <h3>Profile</h3>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Name</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="name"
              value={name}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Last name</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="lastName"
              value={lastName}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="email"
              value={email}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Location</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="location"
              value={location}
            />
          </div>
          {loading ? (
            <div className="loading loading-center "></div>
          ) : (
            <button type="submit" className="btn btn-block">
              Save Changes
            </button>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
