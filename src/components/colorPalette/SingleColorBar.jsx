import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import tinyColor from 'tinycolor2';

import ColorPicker from './ColorPicker';
import PaletteContext from '../../store/palette-context';
import useDebounce from '../../hooks/useDebounce';

const BarWrapper = styled.div`
  --colorMode: ${props => (props.darkMode ? '#fff' : '#202020')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  transition: opacity 0.2s;

  p {
    color: var(--colorMode);
    font-size: 1.7rem;
    margin-bottom: 15rem;
  }

  button {
    background-color: transparent;
    color: var(--colorMode);
    border: none;
    margin-bottom: 3rem;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const SingleColorBar = props => {
  const [color, setColor] = useState(props.color);
  const [colorChangeLocked, setColorChangeLocked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [displayedColor, setDisplayedColor] = useState();

  const { handleSingleColorChange, markColorAsLocked } = useContext(PaletteContext);

  const debouncedColor = useDebounce(color, 500);

  useEffect(() => {
    setDisplayedColor(debouncedColor);
    handleSingleColorChange(props.colorId, debouncedColor);
    setDarkMode(tinyColor(color).isDark());
  }, [debouncedColor]);

  useEffect(() => {
    setDarkMode(tinyColor(color).isDark());
  }, []);

  useEffect(() => {
    markColorAsLocked();
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
      <button aria-label='Lock current color' onClick={handleColorChangeLock}>
        {lockIcon}
      </button>
    </BarWrapper>
  );
};

export default SingleColorBar;
