import React from 'react';
import { useModal } from './ModalContext';
import AlertModal from './AlertModal';
import ConfirmModal from './ConfirmModal';

const ModalContainer: React.FC = () => {
  const { activeModal, closeModal } = useModal();

  if (!activeModal) return null;

  if (activeModal.type === 'alert') {
    return (
      <AlertModal
        message={activeModal.message}
        variant={activeModal.variant || 'info'}
        onClose={activeModal.onClose || closeModal}
      />
    );
  }

  if (activeModal.type === 'confirm') {
    return (
      <ConfirmModal
        message={activeModal.message}
        confirmText={activeModal.confirmText}
        cancelText={activeModal.cancelText}
        variant={activeModal.variant || 'info'}
        onConfirm={activeModal.onConfirm}
        onCancel={activeModal.onCancel || closeModal}
      />
    );
  }

  return null;
};

export default ModalContainer;
