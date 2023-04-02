import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const PickerButton = styled.button`
  background-color: transparent;
  color: var(--colorMode);
  border: none;
  margin-bottom: 3rem;
  font-size: 2rem;
  cursor: pointer;

  .hidden {
    display: none;
  }

  .color-input {
    position: absolute;
    visibility: hidden;
  }
`;

const ColorPicker = props => {
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);

  const colorPickerRef = useRef(null);

  useEffect(() => {
    if (colorPickerIsOpen) colorPickerRef.current.click();
  }, [colorPickerIsOpen]);

  const handleColorPickerVisibility = () => {
    setColorPickerIsOpen(prevState => !prevState);
  };

  const handleColorChange = event => {
    props.handleColorChange(event.target.value);
  };

  return (
    <PickerButton aria-label='Open color picker' onClick={handleColorPickerVisibility}>
      <FontAwesomeIcon icon={faSliders} />
      <label className='hidden' htmlFor='color-picker'>
        Color picker
      </label>
      <input
        className='color-input'
        id='color-picker'
        type='color'
        value={props.currentColor}
        onChange={handleColorChange}
        onBlur={handleColorPickerVisibility}
        ref={colorPickerRef}
      />
    </PickerButton>
  );
};

export default ColorPicker;
