import styled from 'styled-components';
import {
  faBook,
  faArrowRotateRight,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import ControlPanelButton from '../buttons/ControlPanelButton';
import BarQuantityController from './BarQuantityController';

const PanelWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: var(--mainBackground);
  padding: 2rem 7rem;
  height: 25vh;
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;

  .buttons-wrapper {
    display: flex;
    align-items: center;
    column-gap: 20vw;
    margin-top: 3rem;
  }
`;

const MainPanel = () => {
  return (
    <PanelWrapper>
      <BarQuantityController />
      <div className='buttons-wrapper'>
        <ControlPanelButton label='Library' icon={faBook} />
        <ControlPanelButton
          generateMode
          label='Generate'
          icon={faArrowRotateRight}
        />
        <ControlPanelButton label='Save' icon={faFloppyDisk} />
      </div>
    </PanelWrapper>
  );
};

export default MainPanel;
