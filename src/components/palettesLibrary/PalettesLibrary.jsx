import { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import PaletteContext from '../../store/palette-context';
import LibraryTile from './LibraryTile';
import ModalOverlay from '../StyledComponents/ModalOverlay';

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 2rem 2rem;
  border-radius: 15px;
  width: 50vh;

  .list-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    height: 20rem;
    padding: 0.5rem;
    border: 3px solid var(--main-blue);
    border-radius: 5px;
    overflow-y: scroll;
  }

  .close-icon {
    position: absolute;
    top: -5rem;
    right: -5rem;
    font-size: 4rem;
    cursor: pointer;
    color: #fff;
    background-color: transparent;
    border: none;
  }
`;

const PalettesLibrary = () => {
  const ctx = useContext(PaletteContext);

  const closeModal = () => {
    ctx.handleLibraryVisibility();
  };

  const savedPalettes = ctx.savedColorPalettes.map(palette => (
    <LibraryTile key={palette.id} paletteData={palette} />
  ));

  return (
    <ModalOverlay>
      <Modal>
        <button className='close-icon' aria-label='Close modal'>
          <FontAwesomeIcon icon={faCircleXmark} onClick={closeModal} />
        </button>
        <div className='list-wrapper'>{savedPalettes}</div>
      </Modal>
    </ModalOverlay>
  );
};

export default PalettesLibrary;
