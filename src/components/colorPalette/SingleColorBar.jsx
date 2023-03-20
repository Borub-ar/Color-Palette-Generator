import { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock, faSliders } from '@fortawesome/free-solid-svg-icons';

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

  .hidden {
    display: none;
  }

  .color-input {
    position: absolute;
    visibility: hidden;
  }

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
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [displayedColor, setDisplayedColor] = useState();

  const ctx = useContext(PaletteContext);

  const colorPickerRef = useRef(null);
  const debouncedColor = useDebounce(color, 500);

  useEffect(() => {
    setDisplayedColor(debouncedColor);
    ctx.handleSingleColorChange(props.colorId, debouncedColor);
    setDarkMode(tinycolor(color).isDark());
  }, [debouncedColor]);

  useEffect(() => {
    if (colorPickerIsOpen) colorPickerRef.current.click();
  }, [colorPickerIsOpen]);

  useEffect(() => {
    setDarkMode(tinycolor(color).isDark());
  }, []);

  const handleColorChangeLock = () => {
    setColorChangeLocked(current => !current);
  };

  const handleColorPickerVisibility = () => {
    setColorPickerIsOpen(prevState => !prevState);
  };

  const handleColorChange = event => {
    const newColor = event.target.value.toUpperCase();
    setColor(newColor);
  };

  const lockIcon = colorChangeLocked ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />;

  return (
    <BarWrapper color={displayedColor ? displayedColor : color} darkMode={darkMode}>
      <p>{displayedColor ? displayedColor : color}</p>
      <button aria-label='Open color picker' onClick={handleColorPickerVisibility}>
        <FontAwesomeIcon icon={faSliders} />
        <label className='hidden' htmlFor='color-picker'>
          Color picker
        </label>
        <input
          className='color-input'
          id='color-picker'
          type='color'
          value={color}
          onChange={handleColorChange}
          onBlur={handleColorPickerVisibility}
          ref={colorPickerRef}
        />
      </button>
      <button aria-label='Lock current color' onClick={handleColorChangeLock}>
        {lockIcon}
      </button>
    </BarWrapper>
  );
};

export default SingleColorBar;
