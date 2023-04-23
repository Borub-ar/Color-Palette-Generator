import { useContext, useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';

import Color from './Color';
import PaletteContext from '../../store/palette-context';
import device from '../../breakpoints/breakpoints';

const moveLeftButton = keyframes`
  0% {
      transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const moveLeftTile = keyframes`
  0% {
      transform: translateX(0);
  }
  20% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(-120%);
  }
`;

const Tile = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  column-gap: 2rem;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px -0px 24px -7px rgba(66, 68, 90, 1);
  animation: ${props =>
    props.animateTile
      ? css`
          ${moveLeftTile} 1s ease-in-out forwards
        `
      : 'none'};

  .name {
    font-weight: 700;
    color: var(--default-dark);
  }

  .palette-colors {
    display: flex;
    align-items: center;
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    justify-self: end;
    column-gap: 0.6rem;
  }

  .btn {
    height: 30px;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    transition: opacity 0.4s;
    width: 3.3rem;
  }

  .delete-button {
    overflow: hidden;
    position: relative;
  }

  .delete-button::before,
  .delete-button::after {
    font-family: 'Font Awesome 5 Free';
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    animation: ${props =>
      props.animateButton
        ? css`
            ${moveLeftButton} .5s ease-in-out forwards
          `
        : 'none'};
  }

  .delete-button::before {
    content: '\f2ed';
    left: 0;
    background-color: #af2525;
  }

  .delete-button::after {
    content: '\f058';
    right: -100%;
    background-color: #27c027;
  }

  .modify-button {
    background-color: var(--main-blue);
  }

  .buttons-wrapper :is(.delete-button:hover, .modify-button:hover) {
    opacity: 0.8;
    padding: 1rem 0.6rem;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 0.6rem;

    .name {
      text-align: center;
    }

    .buttons-wrapper {
      justify-self: center;
    }

    .btn {
      flex: 1;
      width: 4rem;
    }
  }
`;

const LibraryTile = props => {
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [tileAnimation, setTileAnimation] = useState(false);
  const { deleteSavedPalette, loadSavedPalette } = useContext(PaletteContext);

  const deleteButtonRef = useRef();
  const tileRef = useRef();

  const { colors, id: paletteId, paletteName } = props.paletteData;

  useEffect(() => {
    const handleDeleteButtonAnimationEnd = event => {
      event.stopPropagation();
      setTileAnimation(true);
    };

    const handleTileAnimationEnd = () => {
      deleteSavedPalette(paletteId);
    };

    const deleteButton = deleteButtonRef.current;
    const tile = tileRef.current;

    deleteButton.addEventListener('animationend', handleDeleteButtonAnimationEnd);
    tile.addEventListener('animationend', handleTileAnimationEnd);

    return () => {
      deleteButton.removeEventListener('animationend', handleDeleteButtonAnimationEnd);
      tile.removeEventListener('animationend', handleTileAnimationEnd);
    };
  }, []);

  const startDeleteAnimations = () => {
    setButtonAnimation(true);
  };

  const loadPalette = () => {
    loadSavedPalette(paletteId);
  };

  return (
    <Tile ref={tileRef} animateButton={buttonAnimation} animateTile={tileAnimation}>
      <p className='name'>{paletteName}</p>

      <div className='palette-colors'>
        {colors.map(color => (
          <Color key={color.id} color={color.color} id={color.id} />
        ))}
      </div>

      <div className='buttons-wrapper'>
        <button
          ref={deleteButtonRef}
          onClick={startDeleteAnimations}
          className='btn delete-button'
          aria-label='Delete palette'></button>
        <button onClick={loadPalette} className='btn modify-button' aria-label='Modify palette'>
          <FontAwesomeIcon icon={faPaintBrush} />
        </button>
      </div>
    </Tile>
  );
};

export default LibraryTile;
