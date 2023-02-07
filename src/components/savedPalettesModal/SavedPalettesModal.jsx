import styled from 'styled-components';

const ModalOverlay = styled.section`
  position: fixed;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0000007b;

  .modal {
    background-color: #fff;
    padding: 3rem 5rem;
    border-radius: 15px
  }
`;

const SavedPalettesModal = () => {
  return (
    <ModalOverlay>
      <div className='modal'></div>
    </ModalOverlay>
  );
};

export default SavedPalettesModal;
