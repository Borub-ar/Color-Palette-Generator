import styled from 'styled-components';
import SingleColorBar from './SingleColorBar';

const PaletteWrapper = styled.section`
  display: flex;

  & > * {
    flex: 1;
  }
`;

const ColorPalette = () => {
  const generateRandomHexColor = () => {
    let hex = '#';
    let letters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      hex += letters[Math.floor(Math.random() * 16)];
    }
    return hex;
  };

  return (
    <PaletteWrapper>
      <SingleColorBar generateRandomHexColor={generateRandomHexColor} />
      <SingleColorBar generateRandomHexColor={generateRandomHexColor} />
      <SingleColorBar generateRandomHexColor={generateRandomHexColor} />
      <SingleColorBar generateRandomHexColor={generateRandomHexColor} />
      <SingleColorBar generateRandomHexColor={generateRandomHexColor} />
    </PaletteWrapper>
  );
};

export default ColorPalette;
