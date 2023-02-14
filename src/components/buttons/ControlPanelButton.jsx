import styled from 'styled-components';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PaletteContext from '../../store/palette-context';
import Modal from '../Modal/Modal';

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
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  const handleClick = () => {
    if (props.generateMode) {
      ctx.generateRandomHexColors();
    }

    if (props.saveMode) {
      setAlreadySaved(ctx.checkIfPaletteAlreadySaved());

      if (!alreadySaved) setShowSavePopup(true);
      if (alreadySaved) {
        setTimeout(() => {
          setAlreadySaved(false);
        }, 2000);
      }
    }

    if (props.libraryMode) {
      ctx.handleLibraryVisibility();
    }
  };

  const alreadySavedMsg = props.saveMode && alreadySaved && (
    <p className='save-popup'>Palette already saved</p>
  );

  const saveModal = props.saveMode && showSavePopup && (
    <Modal>
      <input type='text' />
    </Modal>
  );

  return (
    <ButtonWrapper>
      <button className='action' aria-label={props.label} onClick={handleClick}>
        <FontAwesomeIcon icon={props.icon} />
      </button>

      <p className='label'>{props.label}</p>

      {alreadySavedMsg}
      {saveModal}
    </ButtonWrapper>
  );
};

export default ControlPanelButton;
