import { useState, useContext } from 'react';
import styled from 'styled-components';
import { faBook, faArrowRotateRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import ControlPanelButton from '../buttons/ControlPanelButton';
import BarQuantityController from './BarQuantityController';
import SaveModal from '../Modals/SaveModal';
import UpdateModal from '../Modals/UpdateModal';
import PaletteContext from '../../store/palette-context';

const PanelWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: var(--main-background);
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
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const ctx = useContext(PaletteContext);

  const openProperModal = isAlreadySaved => {
    ctx.updateMode && isAlreadySaved ? setShowUpdateModal(true) : setShowSaveModal(true);
  };

  const closeSaveModal = () => {
    setShowSaveModal(false);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <PanelWrapper>
      <BarQuantityController />
      <div className='buttons-wrapper'>
        <ControlPanelButton libraryMode label='Library' icon={faBook} />
        <ControlPanelButton generateMode label='Generate' icon={faArrowRotateRight} />
        <ControlPanelButton saveMode label='Save' openProperModal={openProperModal} icon={faFloppyDisk} />
      </div>

      {showSaveModal && <SaveModal handleClose={closeSaveModal} />}
      {showUpdateModal && <UpdateModal handleClose={closeUpdateModal} />}
    </PanelWrapper>
  );
};

export default MainPanel;
