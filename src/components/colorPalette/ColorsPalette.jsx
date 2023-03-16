import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import PaletteContext from '../../store/palette-context';
import SingleColorBar from './SingleColorBar';

const PaletteWrapper = styled.section`
  position: relative;
  display: flex;

  & > * {
    flex: 1;
  }

  .palette-name {
    --theme: #4e4e4e;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);
    background: var(--main-background);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--theme);
    padding: 0.3rem 1.5rem;
    border-radius: 0 0 10px 10px;
    border: 2px solid var(--theme);
    border-top: none;
    text-align: center;
    transition: transform 0.3s ease-in;
    opacity: 0;
  }

  .show {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  .edit-icon {
    color: var(--main-blue);
    margin-left: 0.4rem;
    cursor: pointer;
  }
`;

const ColorsPalette = props => {
  const ctx = useContext(PaletteContext);
  const { paletteName } = props;

  useEffect(() => {
    ctx.generateRandomHexColors();
  }, []);

  const colorBars = ctx.currentColors.map(hexColor => (
    <SingleColorBar key={hexColor.id} color={hexColor.color} colorId={hexColor.id} />
  ));

  return (
    <PaletteWrapper>
      <p className={`palette-name ${paletteName && paletteName !== '' ? 'show' : ''}`}>
        {paletteName} <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} />
      </p>
      {colorBars}
    </PaletteWrapper>
  );
};

export default ColorsPalette;
