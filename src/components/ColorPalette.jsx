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
      <SingleColorBar color='blue' />
      <SingleColorBar color='red' />
      <SingleColorBar color='yellow' />
      <SingleColorBar color='black' />
      <SingleColorBar color='black' />
      <SingleColorBar color='black' />
    </PaletteWrapper>
  );
};

export default ColorPalette;
