import styled from 'styled-components';
import SingleColorBar from './SingleColorBar';

const PaletteWrapper = styled.section`
  display: flex;

  & > * {
    flex: 1;
  }
`;

const ColorPalette = () => {
  return (
    <PaletteWrapper>
      <SingleColorBar color='#B0F2B4' />
      <SingleColorBar color='#BAF2E9' />
      <SingleColorBar color='#BAD7F2' />
      <SingleColorBar color='#F2BAC9' />
      <SingleColorBar color='#F2E2BA' />
    </PaletteWrapper>
  );
};

export default ColorPalette;
