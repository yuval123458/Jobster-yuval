import Wrapper from "../assets/wrappers/DashboardFormPage";

const SearchContainer = ({ filters, handleChange, clearHandler }) => {
  const { search, status, type, sort } = filters;

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Search</label>
            <input
              onChange={handleChange}
              className="form-input"
              name="search"
              value={search}
              onClick={() => handleChange}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Status</label>
            <select
              value={status}
              name="status"
              onChange={handleChange}
              className="form-input"
              onClick={() => handleChange}
            >
              <option value="all">all</option>
              <option value="pending">pending</option>
              <option value="declined">declined</option>
              <option value="interview">interview</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Type</label>
            <select
              value={type}
              name="type"
              onChange={handleChange}
              className="form-input"
              onClick={() => handleChange}
            >
              <option value="all">all</option>
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="remote">remote</option>
              <option value="internship">internship</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Sort</label>
            <select
              onClick={() => handleChange}
              value={sort}
              name="sort"
              onChange={handleChange}
              className="form-input"
            >
              <option value="latest">lastest</option>
              <option value="oldest">oldest</option>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
            </select>
          </div>

          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-hipster"
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
