import Wrapper from "../assets/wrappers/StatItem";
import styled from "styled-components";

const IconWrapper = styled.div`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bcg};
`;

const StatItem = ({ item }) => {
  return (
    <Wrapper color={item.color}>
      <header>
        <span className="count">{item.count}</span>
        <IconWrapper color={item.color} bcg={item.bcg} className="icon">
          {item.icon}
        </IconWrapper>
      </header>
      <h5 className="title">{item.title}</h5>
    </Wrapper>
  );
};

export default StatItem;
