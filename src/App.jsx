
import styled from "styled-components";
import ControlPanel from './components/ControlPanel';
import ColorPalette from './components/ColorPalette';
import GlobalStyle from './GlobalStyle';

const Wrapper = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  background-color: #e7e6e6;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ColorPalette />
        <ControlPanel />
      </Wrapper>
    </>
  )
}

export default App
