import { useState } from 'react';
import styled from 'styled-components';

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  border: 1px solid black;
`;

const SingleColorBar = props => {
  const [color, setColor] = useState(props.generateRandomHexColor());

  return <BarWrapper color={color}></BarWrapper>;
};

export default SingleColorBar;
