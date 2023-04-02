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
  transition: width 0.3s ease-in-out;

  .copy-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    white-space: nowrap;
  }
`;

const Color = props => {
  const [showColorInfo, setShowColorInfo] = useState(false);
  const [popupMsg, setPopupMsg] = useState(props.color);

  const handleColorInfoVisibility = () => {
    setShowColorInfo(state => !state);
  };

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(props.color);
      setPopupMsg('Color copied!');
      setTimeout(() => {
        setPopupMsg(props.color);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TileWrapper
      color={props.color}
      onMouseEnter={handleColorInfoVisibility}
      onMouseLeave={handleColorInfoVisibility}
      onClick={copyValue}
      aria-label='Copy color to clipboard'>
      {showColorInfo && <FontAwesomeIcon className='copy-icon' icon={faCopy} data-testid='icon' />}
      {showColorInfo && (
        <p className='color-info' data-testid='msg'>
          {popupMsg}
        </p>
      )}
    </TileWrapper>
  );
};

export default Color;
