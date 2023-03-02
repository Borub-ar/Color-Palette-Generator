import ModalBase from './ModalBase';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;

  & > * {
    flex: 1;
  }

  .save-button,
  .update-button {
    border: none;
    border-radius: 4px;
    padding: 1rem 2rem;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
  }

  .save-button {
    background-color: var(--main-blue);
  }

  .update-button {
    background-color: #27ca27;
  }
`;

const UpdateModal = props => {
  return (
    <ModalBase handleClose={props.handleClose}>
      <ButtonsWrapper>
        <button className='save-button'>Save as new</button>
        <button className='update-button'>Update</button>
      </ButtonsWrapper>
    </ModalBase>
  );
};

export default UpdateModal;
