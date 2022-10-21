import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { NextPage, PrevPage, ChangePage } from "../reducers/job-slice";

const PageBtnContainer = () => {
  const { page, NumOfPages } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();

  const pages = [];
  for (let i = 1; i <= NumOfPages; i++) {
    pages.push(i);
  }

  return (
    <Wrapper>
      <button onClick={() => dispatch(PrevPage())} className="prev-btn">
        <HiChevronDoubleLeft />
      </button>
      {pages.map((pageNumber, index) => {
        return (
          <button
            type="button"
            key={index}
            onClick={() => dispatch(ChangePage({ page: pageNumber }))}
            className={pageNumber === page ? "pageBtn active" : "pageBtn"}
          >
            {pageNumber}
          </button>
        );
      })}
      <button onClick={() => dispatch(NextPage())} className="next-btn">
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
