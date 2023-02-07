import { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PaletteContext from '../../store/palette-context';
import SavedPaletteTile from './SavedPaletteTile';

const ModalOverlay = styled.section`
  position: fixed;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0000007b;

  .modal {
    background-color: #fff;
    padding: 2rem 2rem;
    border-radius: 15px;
    width: 50vh;
  }

  .list-wrapper {
    display: flex;
    flex-direction: column;
    height: 20rem;
    border: 3px solid #0000007b;
  }
`;

const PalettesLibrary = () => {
  const ctx = useContext(PaletteContext);

  const closeModal = () => {
    ctx.handleLibraryVisibility();
  };

  const savedPalettes = ctx.savedColorPalettes.map(el => (
    <SavedPaletteTile key={el.id} />
  ));

  return (
    <ModalOverlay onClick={closeModal}>
      <div className='modal'>
        <div className='list-wrapper'>{savedPalettes}</div>
      </div>
    </ModalOverlay>
  );
};

export default PalettesLibrary;
