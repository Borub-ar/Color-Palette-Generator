import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import tinyColor from 'tinycolor2';

import ColorPicker from './ColorPicker';
import PaletteContext from '../../store/palette-context';
import useDebounce from '../../hooks/useDebounce';
import device from '../../breakpoints/breakpoints';

const BarWrapper = styled.div`
  --colorMode: ${props => (props.darkMode ? '#fff' : '#202020')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  transition: opacity 0.2s;
  padding-top: 2rem;

  p {
    color: var(--colorMode);
    font-size: clamp(1rem, 2vw, 2rem);
    margin-bottom: 5rem;
  }

  button {
    background-color: transparent;
    color: var(--colorMode);
    border: none;
    margin-bottom: 3rem;
    font-size: clamp(1.5rem, 2vw, 2.5rem);
    cursor: pointer;
  }

  @media ${device.mobile} {
    flex-direction: row;
    padding-top: 0;

    p {
      margin-bottom: 0;
      margin-right: 4rem;
    }

    button {
      margin-bottom: 0;
    }

    button + button {
      margin-left: 2rem;
    }
  }
`;

const SingleColorBar = props => {
  const { colorData } = props;

  const [color, setColor] = useState(colorData.color);
  const [colorChangeLocked, setColorChangeLocked] = useState(colorData.isLocked);
  const [darkMode, setDarkMode] = useState(false);
  const [displayedColor, setDisplayedColor] = useState();
  const [initial, setInitial] = useState(true);

  const { handleSingleColorChange, markColorAsLocked } = useContext(PaletteContext);

  const debouncedColor = useDebounce(color, 500);

  useEffect(() => {
    setDisplayedColor(debouncedColor);
    handleSingleColorChange(colorData.id, debouncedColor);
    setDarkMode(tinyColor(color).isDark());
  }, [debouncedColor]);

  useEffect(() => {
    setDarkMode(tinyColor(color).isDark());
  }, []);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }

    markColorAsLocked(colorData.id);
  }, [colorChangeLocked]);

  const handleColorChangeLock = () => {
    setColorChangeLocked(current => !current);
  };

  const handleColorChange = hexColor => {
    const newColor = hexColor.toUpperCase();
    setColor(newColor);
  };

  const lockIcon = colorChangeLocked ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />;

  return (
    <BarWrapper color={displayedColor ? displayedColor : color} darkMode={darkMode}>
      <p>{displayedColor ? displayedColor : color}</p>
      <ColorPicker currentColor={color} handleColorChange={handleColorChange} />
      <button aria-label={`Lock current color (${color})`} onClick={handleColorChangeLock}>
        {lockIcon}
      </button>
    </BarWrapper>
  );
};

export default SingleColorBar;
