import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowStats } from "../reducers/job-slice";
import StatsContainer from "../components/StatsContainer";
import ChartsContainer from "../components/ChartsContainer";

const Stats = () => {
  const dispatch = useDispatch();
  const { loading, monthlyApplications } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(ShowStats());
  }, [dispatch]);

  if (loading) {
    return <div className="loading loading-center"></div>;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
