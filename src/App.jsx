import styled from 'styled-components';
import ControlPanel from './components/ControlPanel';
import ColorPalette from './components/ColorPalette';
import GlobalStyle from './GlobalStyle';

const Wrapper = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  background-color: var(--mainBackground);
`;

function App() {
  const handleGenerateRandomColor() => {

  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ColorPalette />
        <ControlPanel />
      </Wrapper>
    </>
  );
}

export default App;
