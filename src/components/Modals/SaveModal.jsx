import { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import PaletteContext from '../../store/palette-context';
import ModalBase from './ModalBase';

const SaveInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  label {
    color: var(--default-dark);
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }

  input[type='text'] {
    border: 2px solid var(--main-blue);
    border-radius: 4px;
    padding: 0.7rem 0.5rem;
    font-size: 1.5rem;
    color: var(--default-dark);
  }

  input[type='text']:focus-visible {
    outline-color: transparent;
    box-shadow: 0 0 7px 2px var(--main-blue);
  }

  .error-msg {
    color: #b82b2b;
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
  }

  button {
    padding: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    background-color: var(--main-blue);
    color: #fff;
    border: none;
    border-radius: 4px;
  }
`;

const SaveModal = props => {
  const { updateMode, saveColorPalette } = useContext(PaletteContext);
  const [paletteName, setPaletteName] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, []);

  const savePaletteName = event => {
    const name = event.target.value.trim();
    setPaletteName(name);
  };

  const savePalette = () => {
    if (paletteName.trim() === '') {
      setShowErrorMsg(true);
      return;
    }

    setShowErrorMsg(false);
    console.log('dsadsa');
    const saveAsNew = updateMode;
    saveColorPalette(paletteName, saveAsNew);
    props.handleClose();
  };

  return (
    <ModalBase handleClose={props.handleClose}>
      <SaveInputWrapper>
        <label htmlFor='name-input'>Choose palette name</label>
        <input type='text' id='name-input' autoComplete='off' ref={input} onBlur={savePaletteName} />
        {showErrorMsg && <p className='error-msg'>Pick any name</p>}
        <button onClick={savePalette} aria-label='Save palette'>
          Save
        </button>
      </SaveInputWrapper>
    </ModalBase>
  );
};

export default SaveModal;
