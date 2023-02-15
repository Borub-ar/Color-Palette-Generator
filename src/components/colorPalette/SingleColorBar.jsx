import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock, faSliders } from '@fortawesome/free-solid-svg-icons';

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  p {
    color: #fff;
    font-size: 1.7rem;
    margin-bottom: 15rem;
  }

  button {
    background-color: transparent;
    color: #fff;
    border: none;
    margin-bottom: 3rem;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const SingleColorBar = props => {
  const [color, setColor] = useState(props.color);
  const [colorChangeLocked, setColorChangeLocked] = useState(false);

  const handleColorChangeLock = () => {
    setColorChangeLocked(current => !current);
  };

  const handleColorChange = () => {
    console.log('change');
  };

  const lockIcon = colorChangeLocked ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />;

  return (
    <BarWrapper color={color}>
      <p>{color}</p>
      <button aria-label='Set current bar color' onClick={handleColorChange}>
        <FontAwesomeIcon icon={faSliders} />
      </button>
      <button aria-label='Lock current color' onClick={handleColorChangeLock}>
        {lockIcon}
      </button>
    </BarWrapper>
  );
};

export default SingleColorBar;
