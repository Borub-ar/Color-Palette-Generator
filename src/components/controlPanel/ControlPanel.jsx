import { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { faBook, faArrowRotateRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import ControlPanelButton from '../buttons/ControlPanelButton';
import BarsQuantityController from './BarsQuantityController';
import SaveModal from '../Modals/SaveModal';
import UpdateModal from '../Modals/UpdateModal';
import PaletteContext from '../../store/palette-context';
import device from '../../breakpoints/breakpoints';

const PanelWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: var(--main-background);
  padding: 2rem 7rem;
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;

  .buttons-wrapper {
    display: flex;
    align-items: center;
    column-gap: 20vw;
    margin-top: 3rem;
  }

  @media (${device.laptop}) {
    padding: 1rem 0.5rem;
    justify-content: space-between;
    gap: 10px;

    .buttons-wrapper {
      margin-top: 1rem;
      justify-content: space-between;
    }
  }
`;

const MainPanel = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { updateMode } = useContext(PaletteContext);

  const openProperModal = useCallback(
    isAlreadySaved => {
      updateMode && isAlreadySaved ? setShowUpdateModal(true) : setShowSaveModal(true);
    },
    [updateMode]
  );

  const closeSaveModal = () => {
    setShowSaveModal(false);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleSuccessModal = () => {
    setShowUpdateModal(false);
  };

  const handleSaveAsNew = () => {
    setShowUpdateModal(false);
    setShowSaveModal(true);
  };

  return (
    <>
      <PanelWrapper>
        <BarsQuantityController />
        <div className='buttons-wrapper'>
          <ControlPanelButton libraryMode label='Library' icon={faBook} />
          <ControlPanelButton generateMode label='Generate' icon={faArrowRotateRight} />
          <ControlPanelButton saveMode label='Save' openProperModal={openProperModal} icon={faFloppyDisk} />
        </div>
      </PanelWrapper>

      {showSaveModal && <SaveModal handleClose={closeSaveModal} />}
      {showUpdateModal && (
        <UpdateModal
          handleClose={closeUpdateModal}
          showSuccessModal={handleSuccessModal}
          handleSaveAsNew={handleSaveAsNew}
        />
      )}
    </>
  );
};

export default MainPanel;
