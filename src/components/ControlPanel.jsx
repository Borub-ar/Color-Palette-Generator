import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faArrowRotateRight,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';

const PanelWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--panelColor);
  padding: 2rem 7rem;
  height: 25vh;
`;

const MainPanel = () => {
  return (
    <PanelWrapper>
      <button className='action-btn'>
        <FontAwesomeIcon icon={faBook} />
        <p>Library</p>
      </button>
      <button className='action-btn'>
        <FontAwesomeIcon icon={faArrowRotateRight} />
        <p>Generate</p>
      </button>
      <button className='action-btn'>
        <FontAwesomeIcon icon={faFloppyDisk} />
        <p>Save</p>
      </button>
    </PanelWrapper>
  );
};

export default MainPanel;
