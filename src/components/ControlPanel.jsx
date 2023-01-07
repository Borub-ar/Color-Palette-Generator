import styled from 'styled-components';

const PanelWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: firebrick;
  padding: 2rem 7rem;
  height: 25vh;
`;

const MainPanel = () => {
  return (
    <PanelWrapper>
      <div>
        <p>Library</p>
      </div>
      <div>
        <p>Generate</p>
      </div>
      <div>
        <p>Save</p>
      </div>
    </PanelWrapper>
  );
};

export default MainPanel;
