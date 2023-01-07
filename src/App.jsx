import './App.css'
import styled from "styled-components";
import MainPanel from './components/MainPanel';

const Wrapper = styled.div`
  height: 100%;
  background-color: blue;
`

function App() {
  return 
  <Wrapper>
    <ColorPalette />
    <MainPanel />
  </Wrapper>
}

export default App
