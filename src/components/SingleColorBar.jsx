import { useState } from 'react';
import styled from 'styled-components';

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  border: 1px solid black;
  transition: opacity .2s;

  &:hover {
    opacity: .9;
  }

  & p {
    color: #fff;
    font-size: 1.7rem;
    margin-bottom: 15rem;
  }

  & button {
    background-color: transparent;
    color: #fff;
    border: none;
    margin-bottom: 3rem;
  }
`;

const SingleColorBar = props => {
  const [color, setColor] = useState(props.color);

  return (
    <BarWrapper color={color}>
      <p>{color}</p>
      <button className='change-btn'>Change</button>
      <button>Lock</button>
    </BarWrapper>
  );
};

export default SingleColorBar;
