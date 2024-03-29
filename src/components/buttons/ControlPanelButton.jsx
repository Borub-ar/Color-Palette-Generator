import { useState, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PaletteContext from "../../store/palette-context";
import device from "../../breakpoints/breakpoints";

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  .action {
    border: none;
    font-size: 1.4rem;
    background-color: var(--default-dark);
    color: var(--main-background);
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
    color: var(--default-dark);
  }

  .save-popup {
    position: absolute;
    top: -60%;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    background-color: var(--default-dark);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    animation-name: fade-in;
    animation-duration: 0.5s;
  }

  @media ${device.laptop} {
    .action {
      padding: 10px 20px;
      font-size: 1rem;
    }

    .label {
      font-size: 1rem;
    }
  }
`;

const ControlPanelButton = props => {
  const [showAlreadySavedMsg, setShowAlreadySavedMsg] = useState();
  const {
    setUpdateMode,
    updateMode,
    checkIfPaletteAlreadySaved,
    generateRandomHexColors,
    handleLibraryVisibility,
  } = useContext(PaletteContext);

  const handleClick = () => {
    if (props.saveMode) handleSave();
    if (props.generateMode) generateRandomHexColors();
    if (props.libraryMode) handleLibraryVisibility();
  };

  const handleSave = () => {
    const isAlreadySaved = checkIfPaletteAlreadySaved();

    if (!isAlreadySaved) setUpdateMode(false);
    if (!isAlreadySaved || updateMode) props.openProperModal(isAlreadySaved);
    if (isAlreadySaved && !updateMode) {
      setShowAlreadySavedMsg(true);

      setTimeout(() => {
        setShowAlreadySavedMsg(false);
      }, 2000);
    }
  };

  const alreadySavedMsg = props.saveMode && showAlreadySavedMsg && (
    <p className='save-popup'>Palette already saved</p>
  );

  return (
    <ButtonWrapper>
      {alreadySavedMsg}
      <button className='action' aria-label={props.label} onClick={handleClick}>
        <FontAwesomeIcon icon={props.icon} />
      </button>

      <p className='label'>{props.label}</p>
    </ButtonWrapper>
  );
};

export default ControlPanelButton;
