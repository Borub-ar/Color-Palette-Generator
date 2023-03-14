import ModalBase from './ModalBase';
import styled from 'styled-components';
import { useContext } from 'react';
import PaletteContext from '../../store/palette-context';

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;

  & > * {
    flex: 1;
  }

  .save-button,
  .update-button {
    border: none;
    border-radius: 4px;
    padding: 1rem 2rem;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
  }

  .save-button {
    background-color: var(--main-blue);
  }

  .update-button {
    background-color: #27ca27;
  }
`;

const UpdateModal = props => {
  const ctx = useContext(PaletteContext);

  const handleUpdate = () => {
    ctx.updatePalette();
    props.handleUpdate();
  };

  return (
    <ModalBase handleClose={props.handleClose}>
      <ButtonsWrapper>
        <button className='save-button' onClick={props.handleSaveAsNew}>
          Save as new
        </button>
        <button className='update-button' onClick={handleUpdate}>
          Update
        </button>
      </ButtonsWrapper>
    </ModalBase>
  );
};

export default UpdateModal;
