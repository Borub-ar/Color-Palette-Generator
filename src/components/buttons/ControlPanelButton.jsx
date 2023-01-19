import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & .action {
    border: none;
    font-size: 1.4rem;
    background-color: var(--panelBtn);
    color: var(--mainBackground);
    padding: 10px 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  & .action:hover {
    opacity: 0.9;
  }

  & .label {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--panelBtn);
  }
`;

const ControlPanelButton = props => {
  const handleClick = () => {
    if (props.generateMode) {
      console.log('generate')
    }
  };

  return (
    <ButtonWrapper>
      <button className='action' aria-label={props.label} onClick={handleClick}>
        <FontAwesomeIcon icon={props.icon} />
      </button>
      <p className='label'>{props.label}</p>
    </ButtonWrapper>
  );
};

export default ControlPanelButton;
