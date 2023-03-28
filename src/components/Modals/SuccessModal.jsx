import ModalBase from './ModalBase';

const SuccessModal = props => {
  return (
    <ModalBase data-testid="modal-base" temporaryMode>
      <p>{props.label}</p>
    </ModalBase>
  );
};

export default SuccessModal;
