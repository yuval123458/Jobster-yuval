import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllJobs = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    sort: "latest",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearHandler = () => {
    setFilters({
      search: "",
      status: "all",
      type: "all",
      sort: "latest",
    });
  };

  return (
    <>
      <SearchContainer
        filters={filters}
        handleChange={handleChange}
        clearHandler={clearHandler}
      />
      <JobsContainer filters={filters} />
    </>
  );
};

export default AllJobs;
