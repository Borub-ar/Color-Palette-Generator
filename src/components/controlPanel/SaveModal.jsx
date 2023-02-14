import styled from 'styled-components';
import Modal from '../Modal/Modal';

const SaveInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  label {
    color: var(--default-dark);
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }

  input[type='text'] {
    border: 3px solid var(--main-blue);
    border-radius: 4px;
    padding: 0.7rem 0.5rem;
    font-size: 1.5rem;
  }

  button {
    padding: 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const SaveModal = props => {
  return (
    <Modal handleClose={props.handleClose}>
      <SaveInputWrapper>
        <label for='name-input'>Chose palette name</label>
        <input type='text' id='name-input' />
        <button aria-label='Save palette'>Save</button>
      </SaveInputWrapper>
    </Modal>
  );
};

export default SaveModal;
