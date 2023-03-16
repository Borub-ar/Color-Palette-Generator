import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PaletteContext from '../../store/palette-context';
import SingleColorBar from './SingleColorBar';

const PaletteWrapper = styled.section`
  position: relative;
  display: flex;

  & > * {
    flex: 1;
  }

  .palette_name {
    --theme: #4e4e4e;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: var(--main-background);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--theme);
    padding: 0.3rem 1.5rem;
    border-radius: 0 0 10px 10px;
    border: 2px solid var(--theme);
    border-top: none;
  }
`;

const ColorsPalette = props => {
  const ctx = useContext(PaletteContext);

  useEffect(() => {
    ctx.generateRandomHexColors();
  }, []);

  const colorBars = ctx.currentColors.map(hexColor => (
    <SingleColorBar key={hexColor.id} color={hexColor.color} colorId={hexColor.id} />
  ));

  return (
    <PaletteWrapper paletteName={props.paletteName}>
      <p className='palette_name'>Palette Name</p>
      {colorBars}
    </PaletteWrapper>
  );
};

export default ColorsPalette;
