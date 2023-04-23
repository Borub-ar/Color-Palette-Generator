import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import PaletteContext from '../../store/palette-context';
import LibraryTile from './LibraryTile';
import ModalBase from '../modals/ModalBase';
import device from '../../breakpoints/breakpoints';

const LibraryList = styled.div`
  .list-wrapper {
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.isEmpty ? 'center ' : 'stretch')};
    justify-content: ${props => (props.isEmpty ? 'center ' : 'flex-start')};
    row-gap: 1rem;
    height: 20rem;
    padding: 1.3rem 0.5rem;
    border: 3px solid var(--main-blue);
    border-radius: 5px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .list-wrapper::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }

  .list-wrapper::-webkit-scrollbar-thumb {
    background-color: var(--default-dark);
    border-radius: 10px;
  }

  .empty-library-msg {
    text-align: center;
    font-weight: 700;
    font-size: 1.7rem;
    color: var(--default-dark);
  }

  @media ${device.tablet} {
    .list-wrapper {
      height: 100%;
    }
  }
`;

const PalettesLibrary = () => {
  const { savedColorPalettes, handleLibraryVisibility } = useContext(PaletteContext);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(savedColorPalettes.length === 0);
  }, [savedColorPalettes]);

  const closeModal = () => {
    handleLibraryVisibility();
  };

  const savedPalettes = isEmpty ? (
    <p className='empty-library-msg'>No palettes saved</p>
  ) : (
    savedColorPalettes.map(palette => <LibraryTile key={palette.id} paletteData={palette} />)
  );

  return (
    <ModalBase handleClose={closeModal}>
      <LibraryList isEmpty={isEmpty}>
        <div className='list-wrapper'>{savedPalettes}</div>
      </LibraryList>
    </ModalBase>
  );
};

export default PalettesLibrary;
