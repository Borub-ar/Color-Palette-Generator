import { useContext } from 'react';
import styled from 'styled-components';

import PaletteContext from '../../store/palette-context';
import LibraryTile from './LibraryTile';
import Modal from '../Modal/Modal';

const LibraryList = styled.div`
  .list-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    height: 20rem;
    padding: 1.3rem .5rem;
    border: 3px solid var(--main-blue);
    border-radius: 5px;
    overflow-y: scroll;
  }

  .list-wrapper::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }

  .list-wrapper::-webkit-scrollbar-thumb {
    background-color: #5e35bd;
    border-radius: 10px;
  }
`;

const PalettesLibrary = () => {
  const ctx = useContext(PaletteContext);

  const closeModal = () => {
    ctx.handleLibraryVisibility();
  };

  const savedPalettes = ctx.savedColorPalettes.map(palette => <LibraryTile key={palette.id} paletteData={palette} />);

  return (
    <Modal handleClose={closeModal}>
      <LibraryList>
        <div className='list-wrapper'>{savedPalettes}</div>
      </LibraryList>
    </Modal>
  );
};

export default PalettesLibrary;
