import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import PaletteContext from '../../store/palette-context';
import { useState } from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & .action {
    border: none;
    font-size: 1.4rem;
    background-color: var(--defaultDark);
    color: var(--mainBackground);
    padding: 10px 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .action:hover {
    opacity: 0.9;
  }

  .label {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--defaultDark);
  }

  .save-popup {
    position: absolute;
    top: -60%;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    background-color: var(--defaultDark);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 10px;
  }
`;

const ControlPanelButton = props => {
  const ctx = useContext(PaletteContext);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleClick = () => {
    if (props.generateMode) {
      ctx.generateRandomHexColors();
    }

    if (props.saveMode) {
      const saveSuccessful = ctx.saveColorPalette();
      const popupMessage = saveSuccessful
        ? 'Palette saved'
        : 'Palette already saved';
      setPopupMessage(popupMessage);

      setShowSavePopup(true);

      setTimeout(() => {
        setShowSavePopup(false);
      }, 2000);
    }
  };

  return (
    <ButtonWrapper>
      <button className='action' aria-label={props.label} onClick={handleClick}>
        <FontAwesomeIcon icon={props.icon} />
      </button>
      <p className='label'>{props.label}</p>

      {props.saveMode && showSavePopup && (
        <p className='save-popup'>{popupMessage}</p>
      )}
    </ButtonWrapper>
  );
};

export default ControlPanelButton;
