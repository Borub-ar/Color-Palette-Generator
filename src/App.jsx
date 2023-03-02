import styled from 'styled-components';
import { useState } from 'react';
import GlobalStyle from './GlobalStyle';
import PaletteContext from './store/palette-context';
import ColorPalette from './components/colorPalette/ColorPalette';
import ControlPanel from './components/controlPanel/ControlPanel';
import PalettesLibrary from './components/palettesLibrary/PalettesLibrary';

const Wrapper = styled.main`
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  background-color: var(--main-background);
`;

function App() {
  const [currentPaletteId, setCurrentPaletteId] = useState('');
  const [currentColors, setCurrentColors] = useState([]);
  const [savedColorPalettes, setSavedColorPalettes] = useState([]);
  const [numberOfBars, setNumberOfBars] = useState(5);
  const [showLibrary, setShowLibrary] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const generateRandomHexColors = () => {
    const generatedColors = [];
    for (let i = numberOfBars; i > 0; i--) {
      let hex = '#';
      let letters = '0123456789ABCDEF';
      for (let i = 0; i < 6; i++) {
        hex += letters[Math.floor(Math.random() * 16)];
      }
      generatedColors.push({ color: hex, id: crypto.randomUUID() });
    }
    setUpdateMode(false);
    setCurrentColors(generatedColors);
    generatePaletteId();
  };

  const generatePaletteId = () => {
    const randomId = crypto.randomUUID();
    setCurrentPaletteId(randomId);
  };

  const updateColorBarsQuantity = number => {
    setNumberOfBars(number);
  };

  const checkIfPaletteAlreadySaved = () => {
    return savedColorPalettes.some(palette => palette.id === currentPaletteId);
  };

  const deleteSavedPalette = id => {
    setSavedColorPalettes(prevState => prevState.filter(item => item.id !== id));
  };

  const handleSingleColorChange = (colorId, newColor) => {
    setCurrentColors(prevState => {
      const colorIndex = prevState.findIndex(color => color.id === colorId);
      prevState[colorIndex].color = newColor;
      return prevState;
    });

    const paletteAlreadySaved = checkIfPaletteAlreadySaved();
    setUpdateMode(paletteAlreadySaved);
  };

  const saveColorPalette = paletteName => {
    setSavedColorPalettes(prevState => [
      ...prevState,
      {
        paletteName,
        colors: currentColors,
        id: currentPaletteId,
      },
    ]);
  };

  const handleLibraryVisibility = () => {
    setShowLibrary(prevState => !prevState);
  };

  const providerValues = {
    currentColors,
    setCurrentColors,
    numberOfBars,
    updateColorBarsQuantity,
    generateRandomHexColors,
    checkIfPaletteAlreadySaved,
    saveColorPalette,
    deleteSavedPalette,
    savedColorPalettes,
    handleLibraryVisibility,
    handleSingleColorChange,
    updateMode,
  };

  return (
    <PaletteContext.Provider value={providerValues}>
      <GlobalStyle />
      <Wrapper>
        <ColorPalette />
        <ControlPanel />
        {showLibrary && <PalettesLibrary />}
      </Wrapper>
    </PaletteContext.Provider>
  );
}

export default App;
