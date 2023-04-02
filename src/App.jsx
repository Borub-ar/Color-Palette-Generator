import styled from 'styled-components';
import { useState } from 'react';
import uuid4 from 'uuid4';
import lodash from 'lodash';

import GlobalStyle from './GlobalStyle';
import PaletteContext from './store/palette-context';
import ColorPalette from './components/ColorPalette/ColorsPalette';
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
  const [currentPaletteName, setCurrentPaletteName] = useState('');
  const [savedColorPalettes, setSavedColorPalettes] = useState([]);

  const [numberOfBars, setNumberOfBars] = useState(5);
  const [showLibrary, setShowLibrary] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const generateRandomHexColors = initialRender => {
    const generatedColors = [];
    for (let i = numberOfBars; i > 0; i--) {
      let hex = '#';
      let letters = '0123456789ABCDEF';
      for (let i = 0; i < 6; i++) {
        hex += letters[Math.floor(Math.random() * 16)];
      }
      const color = { color: hex, id: uuid4() };
      if (initialRender) color.isLocked = false;
      generatedColors.push(color);
    }
    generatePaletteId();
    setUpdateMode(false);
    setCurrentColors(generatedColors);
    setCurrentPaletteName('');
  };

  const generatePaletteId = () => {
    const randomId = uuid4();
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
    if (id === currentPaletteId) setCurrentPaletteName('');
  };

  const handleSingleColorChange = (colorId, newColor) => {
    setCurrentColors(prevState => {
      const newState = lodash.cloneDeep(prevState);
      const colorIndex = newState.findIndex(color => color.id === colorId);
      newState[colorIndex].color = newColor;
      return newState;
    });

    const paletteAlreadySaved = checkIfPaletteAlreadySaved();
    setUpdateMode(paletteAlreadySaved);
  };

  const saveColorPalette = (paletteName, saveAsNew) => {
    if (saveAsNew) setUpdateMode(false);

    const id = saveAsNew ? uuid4() : currentPaletteId;
    const colors = saveAsNew
      ? lodash.cloneDeep(currentColors.map(color => ({ ...color, id: uuid4() })))
      : lodash.cloneDeep(currentColors);

    setCurrentPaletteId(id);
    setCurrentPaletteName(paletteName);
    setSavedColorPalettes(prevState => [
      {
        paletteName,
        colors,
        id,
      },
      ...prevState,
    ]);
  };

  const updatePalette = () => {
    setSavedColorPalettes(prevState => {
      const updatedState = lodash.cloneDeep(prevState);
      const paletteIndex = prevState.findIndex(el => el.id === currentPaletteId);
      updatedState[paletteIndex].colors = currentColors;
      return updatedState;
    });

    setUpdateMode(false);
  };

  const handleLibraryVisibility = () => {
    setShowLibrary(prevState => !prevState);
  };

  const changeUpdateMode = state => {
    setUpdateMode(state);
  };

  const loadSavedPalette = id => {
    const paletteData = lodash.cloneDeep(savedColorPalettes.filter(el => el.id === id));
    setCurrentPaletteId(id);
    setCurrentPaletteName(paletteData[0].paletteName);
    setCurrentColors(lodash.cloneDeep(paletteData[0].colors));
    setShowLibrary(false);
  };

  const markColorAsLocked = colorId => {
    // console.log('dsadas')
  };

  const providerValues = {
    currentColors,
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
    updatePalette,
    changeUpdateMode,
    loadSavedPalette,
    markColorAsLocked,
  };

  return (
    <PaletteContext.Provider value={providerValues}>
      <GlobalStyle />
      <Wrapper>
        <ColorPalette paletteName={currentPaletteName} />
        <ControlPanel />
        {showLibrary && <PalettesLibrary />}
      </Wrapper>
    </PaletteContext.Provider>
  );
}

export default App;
