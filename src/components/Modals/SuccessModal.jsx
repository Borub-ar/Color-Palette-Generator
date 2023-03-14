import ModalBase from './ModalBase';

const SuccessModal = props => {
  return (
    <ModalBase temporaryMode>
      <p className='information'>{props.label}</p>
    </ModalBase>
  );
};

export default SuccessModal;
