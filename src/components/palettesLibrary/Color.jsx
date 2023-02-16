import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const TileWrapper = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 30px;
  border-radius: 2px;
  border: none;
  background-color: ${props => props.color};
  cursor: pointer;
  transition: width .3s ease-in-out;

  .copy-icon {
    color: #fff;
  }

  .color-info {
    position: absolute;
    top: -2rem;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%);
    padding: 0.4rem 0.7rem;
    border-radius: 4px;
    background-color: var(--default-dark);
    color: #fff;
    font-weight: 700;
  }
`;

const Color = props => {
  const [showColorInfo, setShowColorInfo] = useState(false);

  const handleColorInfoVisibility = () => {
    setShowColorInfo(state => !state);
  };

  return (
    <TileWrapper color={props.color} onMouseEnter={handleColorInfoVisibility} onMouseLeave={handleColorInfoVisibility}>
      {showColorInfo && <FontAwesomeIcon icon={faCopy} className='copy-icon' />}
      {showColorInfo && <p className='color-info'>{props.color}</p>}
    </TileWrapper>
  );
};

export default Color;
