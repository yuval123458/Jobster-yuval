import Wrapper from "../assets/wrappers/JobInfo";
import { FaLocationArrow } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLuggage } from "react-icons/md";
import Moment from "react-moment";

const JobInfo = (job) => {
  return (
    <>
      <Wrapper>
        <span className="icon">
          <FaLocationArrow />
        </span>
        <span className="text">{job.location}</span>
      </Wrapper>
      <Wrapper>
        <span className="icon">
          <MdLuggage />
        </span>
        <span className="text">{job.type}</span>
      </Wrapper>
      <Wrapper>
        <span className="icon">
          <FaCalendarAlt />
        </span>
        <span className="text">
          <Moment format="YYYY/MM/DD">{job.createdAt}</Moment>
        </span>
      </Wrapper>
    </>
  );
};

export default JobInfo;
