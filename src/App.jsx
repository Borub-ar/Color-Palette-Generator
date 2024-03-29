import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import uuid4 from 'uuid4';

import GlobalStyle from './GlobalStyle';
import PaletteContext from './store/palette-context';
import ColorPalette from './components/colorPalette/ColorsPalette';
import ControlPanel from './components/controlPanel/ControlPanel';
import PalettesLibrary from './components/palettesLibrary/PalettesLibrary';
import useGenerateColor from './hooks/useGenerateColor';

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

  useEffect(() => {
    setSavedColorPalettes(JSON.parse(localStorage.getItem('palettes')).reverse());
  }, []);

  const generateRandomHexColors = initialRender => {
    const someColorsAreLocked = currentColors.some(color => color.isLocked);

    if (someColorsAreLocked) {
      setCurrentColors(prevState => {
        const newState = cloneDeep(prevState).map(color => {
          if (color.isLocked) return { id: uuid4(), color: color.color, isLocked: true };
          if (!color.isLocked) return { id: uuid4(), color: useGenerateColor() };
        });

        return newState;
      });
    }

    if (!someColorsAreLocked) {
      const generatedColors = [];
      for (let i = numberOfBars; i > 0; i--) {
        let hexColor = useGenerateColor();
        const color = { color: hexColor, id: uuid4() };
        if (initialRender) color.isLocked = false;
        generatedColors.push(color);
        setCurrentColors(generatedColors);
      }
    }

    generatePaletteId();
    setUpdateMode(false);
    setCurrentPaletteName('');
  };

  const generatePaletteId = () => {
    const randomId = uuid4();
    setCurrentPaletteId(randomId);
  };

  const updateColorBarsQuantity = number => {
    setNumberOfBars(number);
    resetColorLock();
  };

  const resetColorLock = () => {
    setCurrentColors(prevState => prevState.map(color => ({ ...color, isLocked: false })));
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
      const newState = cloneDeep(prevState);
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
      ? cloneDeep(currentColors.map(color => ({ ...color, id: uuid4(), isLocked: false })))
      : cloneDeep(currentColors.map(color => ({ ...color, isLocked: false })));

    const newColorsPalette = {
      paletteName,
      colors,
      id,
    };

    addSavedPaletteToLocalStorage(newColorsPalette);
    setCurrentPaletteId(id);
    setCurrentPaletteName(paletteName);
    setSavedColorPalettes(prevState => [newColorsPalette, ...prevState]);
  };

  const addSavedPaletteToLocalStorage = palette => {
    localStorage.getItem('palettes') === null && localStorage.setItem('palettes', JSON.stringify([palette]));

    if (localStorage.getItem('palettes') !== null) {
      const palettes = JSON.parse(localStorage.getItem('palettes'));
      const updatedPalettes = [...palettes, palette];
      localStorage.setItem('palettes', JSON.stringify(updatedPalettes));
    }
  };

  const updatePalette = () => {
    setSavedColorPalettes(prevState => {
      const updatedState = cloneDeep(prevState);
      const paletteIndex = prevState.findIndex(el => el.id === currentPaletteId);
      updatedState[paletteIndex].colors = currentColors;
      return updatedState;
    });

    setUpdateMode(false);
  };

  const handleLibraryVisibility = () => {
    setShowLibrary(prevState => !prevState);
  };

  const loadSavedPalette = id => {
    const paletteData = cloneDeep(savedColorPalettes.filter(el => el.id === id));
    setCurrentPaletteId(id);
    setCurrentPaletteName(paletteData[0].paletteName);
    setCurrentColors(cloneDeep(paletteData[0].colors));
    setShowLibrary(false);
    setUpdateMode(false);
  };

  const updatePaletteName = newName => {
    setCurrentPaletteName(newName);
    setSavedColorPalettes(prevState => {
      const newState = cloneDeep(prevState);
      const paletteToUpdateIndex = prevState.findIndex(palette => palette.id === currentPaletteId);
      newState[paletteToUpdateIndex].paletteName = newName;
      return newState;
    });
  };

  const markColorAsLocked = colorId => {
    setCurrentColors(prevState => {
      const newState = cloneDeep(prevState);
      const colorIndex = newState.findIndex(color => color.id === colorId);
      newState[colorIndex].isLocked = !newState[colorIndex].isLocked;
      return newState;
    });
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
    setUpdateMode,
    updateMode,
    updatePalette,
    loadSavedPalette,
    markColorAsLocked,
    updatePaletteName,
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
