import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import device from '../../breakpoints/breakpoints';

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
  backdrop-filter: blur(4px);

  .information {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .modal {
    position: relative;
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

  @media ${device.tablet} {
    .modal {
      display: grid;
      grid-template-columns: 1fr;
      width: 100vw;
      height: 100vh;
      padding: 6rem 2rem 2rem;
      border-radius: 0;
    }

    .close-icon {
      top: 1rem;
      right: 1rem;
      font-size: 3rem;
      color: #000;
    }

    @media ${device.mobile} {
      .modal {
        padding: 6em 1rem 2rem;
      }
    }
  }
`;

const ModalBase = props => {
  return (
    <ModalOverlay temporaryMode={props.temporaryMode}>
      <div className='modal' data-testid='modal-overlay'>
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
