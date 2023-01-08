import styled from 'styled-components';
import {
  faBook,
  faArrowRotateRight,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import ControlPanelButton from './buttons/ControlPanelButton';

const PanelWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background-color: var(--mainBackground);
  padding: 2rem 7rem;
  height: 25vh;
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
`;

const MainPanel = () => {
  return (
    <PanelWrapper>
      <ControlPanelButton label='Library' icon={faBook} />
      <ControlPanelButton label='Generate' icon={faArrowRotateRight} />
      <ControlPanelButton label='Save' icon={faFloppyDisk} />
    </PanelWrapper>
  );
};

export default MainPanel;
