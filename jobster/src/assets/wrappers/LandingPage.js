import styled from "styled-components";

const Wrapper = styled.div`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  h1 {
    font-weight: bold;
  }
  .page {
    display: flex;
    align-items: center;
    min-height: calc(100vh - var(--nav-height));
  }
  .main-img {
    display: none;
  }
  p {
    color: var(--grey-600);
  }
  span {
    color: var(--primary-400);
  }
  @media (min-width: 992px) {
    .main-img {
      display: block;
      width: 50%;
      margin: auto;
      margin-left: 5rem;
    }
  }
`;

export default Wrapper;
