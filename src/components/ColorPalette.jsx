import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PaletteContext from '../store/palette-context';
import SingleColorBar from './SingleColorBar';

const PaletteWrapper = styled.section`
  display: flex;

  & > * {
    flex: 1;
  }

  @media (width < 550px) {
    flex-direction: column;
  }
`;

const ColorPalette = () => {
  const ctx = useContext(PaletteContext);

  useEffect(() => {
    ctx.generateRandomHexColors();
  }, []);

  const colorBars = ctx.colors.map(hexColor => (
    <SingleColorBar key={hexColor} color={hexColor} />
  ));

  return <PaletteWrapper>{colorBars}</PaletteWrapper>;
};

export default ColorPalette;
