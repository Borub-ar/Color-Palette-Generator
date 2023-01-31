import styled from 'styled-components';
import { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import ColorPalette from './components/ColorPalette';
import GlobalStyle from './GlobalStyle';
import PaletteContext from './store/palette-context';

const Wrapper = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  background-color: var(--mainBackground);
`;

function App() {
  const [colors, setColors] = useState([])
  const [numberOfBars, setNumberOfBars] = useState(5);

  const generateRandomHexColors = () => {
    const generatedColors = [];
    for (let i = numberOfBars; i > 0; i--) {
      let hex = '#';
      let letters = '0123456789ABCDEF';
      for (let i = 0; i < 6; i++) {
        hex += letters[Math.floor(Math.random() * 16)];
      }
      generatedColors.push(hex);
    }
    setColors(generatedColors);
  };

  return (
    <PaletteContext.Provider
      value={{
        colors,
        setColors,
        numberOfBars,
        generateRandomHexColors,
      }}>
      <GlobalStyle />
      <Wrapper>
        <ColorPalette />
        <ControlPanel />
      </Wrapper>
    </PaletteContext.Provider>
  );
}

export default App;
