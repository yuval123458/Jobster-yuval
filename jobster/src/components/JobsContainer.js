import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector } from "react-redux";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
import { useEffect } from "react";
import { GetAllJobs } from "../reducers/job-slice";
import { useDispatch } from "react-redux";

const JobsContainer = ({ filters }) => {
  const { NumOfPages, jobsPerPage } = useSelector((store) => store.jobs);
  const { jobs, loading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllJobs(filters));
  }, [filters]);

  if (loading) {
    return (
      <Wrapper>
        <div className="loading loading-center"></div>
      </Wrapper>
    );
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>{jobs.length} Jobs Found.</h5>
      <div className="jobs">
        {jobsPerPage.map((job) => (
          <Job key={job._id} {...job} />
        ))}
        {NumOfPages > 1 && <PageBtnContainer />}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
