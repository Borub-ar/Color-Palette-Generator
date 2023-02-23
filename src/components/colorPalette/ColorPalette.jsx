import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PaletteContext from '../../store/palette-context';
import SingleColorBar from './SingleColorBar';

const PaletteWrapper = styled.section`
  display: flex;

  & > * {
    flex: 1;
  }
`;

const ColorPalette = () => {
  const ctx = useContext(PaletteContext);

  useEffect(() => {
    ctx.generateRandomHexColors();
  }, []);

  const colorBars = ctx.currentColors.map(hexColor => (
    <SingleColorBar key={hexColor.id} color={hexColor.color} colorId={hexColor.id} />
  ));

  return <PaletteWrapper>{colorBars}</PaletteWrapper>;
};

export default ColorPalette;
