import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { CreateJob } from "../reducers/job-slice";
import { EditJob } from "../reducers/job-slice";

const AddJob = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const state = useLocation().state;

  const { edit, initialJob } = state;

  console.log(edit, initialJob);

  const [job, setJob] = useState({
    position: initialJob ? initialJob.job.position : "",
    company: initialJob ? initialJob.job.company : "",
    location: initialJob ? initialJob.job.location : user?.location,
    status: initialJob ? initialJob.job.status : "pending",
    type: initialJob ? initialJob.job.type : "full-time",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(job);
  };

  const clearHandler = () => {
    setJob({
      position: "",
      company: "",
      location: user?.location,
      status: "pending",
      type: "full-time",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (edit) {
      dispatch(EditJob({ id: initialJob.job._id, job: job }));
    } else {
      dispatch(CreateJob(job));
    }
  };

  const { position, company, location, status, type } = job;

  return (
    <Wrapper>
      <form onSubmit={submitHandler} className="form">
        <h3>{edit ? "Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Position</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="position"
              value={position}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Company</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="company"
              value={company}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Job Location</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="location"
              value={location}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Status</label>
            <select
              value={status}
              name="status"
              onChange={handleChange}
              className="form-input"
            >
              <option value="pending">pending</option>
              <option value="declined">declined</option>
              <option value="interview">interview</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Job Type</label>
            <select
              value={type}
              name="type"
              onChange={handleChange}
              className="form-input"
            >
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="remote">remote</option>
              <option value="internship">internship</option>
            </select>
          </div>

          <div className="btn-container">
            <button
              onClick={clearHandler}
              type="button"
              className=" btn clear-btn"
            >
              Clear
            </button>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
