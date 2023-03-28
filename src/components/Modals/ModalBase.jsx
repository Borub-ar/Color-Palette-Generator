import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000a2;
  animation-name: fade-in;
  animation-duration: 0.5s;

  .information {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem 2rem;
    border-radius: 15px;
    width: ${props => (props.temporaryMode ? '20vw' : 'clamp(300px, 50vw, 800px)')};
  }

  .close-icon {
    position: absolute;
    top: -5rem;
    right: -5rem;
    font-size: 4rem;
    cursor: pointer;
    color: #fff;
    background-color: transparent;
    border: none;
  }
`;

const ModalBase = props => {
  return (
    <ModalOverlay temporaryMode={props.temporaryMode}>
      <div className='modal'>
        {!props.temporaryMode && (
          <button className='close-icon' onClick={props.handleClose} aria-label='Close modal'>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {props.children}
      </div>
    </ModalOverlay>
  );
};

export default ModalBase;
