import styled, { css, keyframes } from 'styled-components';
import Color from './Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useRef, useEffect } from 'react';
import PaletteContext from '../../store/palette-context';
import '@fortawesome/fontawesome-free/css/all.css';

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
  grid-template-columns: 1fr 2fr 1fr;
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
    column-gap: 0.2rem;
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    justify-self: end;
    column-gap: 0.6rem;
  }

  button {
    height: 30px;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    transition: opacity 0.4s;
  }

  .delete-button,
  .modify-button {
    width: 3.5rem;
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
  }
`;

const LibraryTile = props => {
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [tileAnimation, setTileAnimation] = useState(false);

  const ctx = useContext(PaletteContext);
  const colors = props.paletteData.colors.map(color => ({ color, id: crypto.randomUUID() }));

  const deleteButtonRef = useRef();
  const tileRef = useRef();

  useEffect(() => {
    deleteButtonRef.current.addEventListener('animationend', handleDeleteButtonAnimationEnd);
  }, []);

  const startDeleteAnimation = () => {
    setButtonAnimation(true);
  };

  const handleDeleteButtonAnimationEnd = event => {
    event.stopPropagation();
    event.preventDefault();
    deleteButtonRef.current.removeEventListener('animationend', handleDeleteButtonAnimationEnd);
    tileRef.current.addEventListener('animationend', handleTileAnimationEnd);
    setTileAnimation(true);
  };

  const handleTileAnimationEnd = () => {
    console.log('asdsa');
    // ctx.deleteSavedPalette(props.paletteData.id);
  };

  return (
    <Tile ref={tileRef} animateButton={buttonAnimation} animateTile={tileAnimation}>
      <p className='name'>{props.paletteData.paletteName}</p>

      <div className='palette-colors'>
        {colors.map(color => (
          <Color key={color.id} color={color.color} />
        ))}
      </div>

      <div className='buttons-wrapper'>
        <button
          ref={deleteButtonRef}
          className='delete-button'
          onClick={startDeleteAnimation}
          aria-label='Delete palette'></button>
        <button className='modify-button' aria-label='Modify palette'>
          <FontAwesomeIcon icon={faPaintBrush} />
        </button>
      </div>
    </Tile>
  );
};

export default LibraryTile;
