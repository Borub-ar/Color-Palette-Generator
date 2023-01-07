import styled from "styled-components";

const BarWrapper = styled.div`
    background-color: ${props => props.color ? props.color : "red"};
    border: 1px solid black;
` 

const SingleColorBar = (props) => {
  return (
    <BarWrapper>{props.color}</BarWrapper>
  )
}

export default SingleColorBar