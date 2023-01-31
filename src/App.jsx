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

  return (
    <PaletteContext.Provider
      value={{
        colors,
        setColors,
        numberOfBars,
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
