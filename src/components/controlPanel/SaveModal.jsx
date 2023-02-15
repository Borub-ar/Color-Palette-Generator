import { useContext, useState } from 'react';
import PaletteContext from '../../store/palette-context';
import styled from 'styled-components';
import Modal from '../Modal/Modal';

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
    border: 3px solid var(--main-blue);
    border-radius: 4px;
    padding: 0.7rem 0.5rem;
    font-size: 1.5rem;
    color: var(--default-dark);
  }

  input[type='text']:focus-visible {
    outline: none;
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
  const ctx = useContext(PaletteContext);
  const [paletteName, setPaletteName] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const savePaletteName = event => {
    const name = event.target.value.trim();
    setPaletteName(name);
  };

  const savePalette = () => {
    if (paletteName === '') {
      setShowErrorMsg(true);
      return;
    }

    setShowErrorMsg(false);
    ctx.saveColorPalette(paletteName);
    props.handleClose();
  };

  return (
    <Modal handleClose={props.handleClose}>
      <SaveInputWrapper>
        <label htmlFor='name-input'>Choose palette name</label>
        <input type='text' id='name-input' autoComplete='off' onBlur={savePaletteName} />
        {showErrorMsg && <p className='error-msg'>Pick any name</p>}
        <button aria-label='Save palette' onClick={savePalette}>
          Save
        </button>
      </SaveInputWrapper>
    </Modal>
  );
};

export default SaveModal;
