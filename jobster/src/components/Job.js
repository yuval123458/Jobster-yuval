import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteJob } from "../reducers/job-slice";

const Job = (job) => {
  const dispatch = useDispatch();

  const editHandler = (e) => {};

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{job.company.slice(0, 1)}</div>
        <div className="info">
          <h5>{job.position}</h5>
          <p>{job.company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo {...job} />
          <div className={`status ${job.status}`}>{job.status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              state={{ edit: true, initialJob: { job } }}
              className="btn edit-btn"
              to="/add-jobs"
            >
              Edit
            </Link>
            <button
              onClick={() => dispatch(DeleteJob(job._id))}
              type="button"
              className="btn delete-btn"
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
