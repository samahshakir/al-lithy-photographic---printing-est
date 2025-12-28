import React, { createContext, useContext, useState, useCallback } from 'react';
import { ModalConfig, AlertVariant } from '../../types';

interface ModalContextType {
  showAlert: (message: string, variant?: AlertVariant) => void;
  showConfirm: (message: string, options?: ConfirmOptions) => Promise<boolean>;
  closeModal: () => void;
  activeModal: ModalConfig | null;
}

interface ConfirmOptions {
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalConfig | null>(null);
  const [confirmResolver, setConfirmResolver] = useState<((value: boolean) => void) | null>(null);

  const showAlert = useCallback((message: string, variant: AlertVariant = 'info') => {
    setActiveModal({
      type: 'alert',
      message,
      variant,
      onClose: () => setActiveModal(null)
    });
  }, []);

  const showConfirm = useCallback((message: string, options?: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmResolver(() => resolve);
      setActiveModal({
        type: 'confirm',
        message,
        confirmText: options?.confirmText,
        cancelText: options?.cancelText,
        variant: options?.variant || 'info',
        onConfirm: () => {
          resolve(true);
          setActiveModal(null);
          setConfirmResolver(null);
        },
        onCancel: () => {
          resolve(false);
          setActiveModal(null);
          setConfirmResolver(null);
        }
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    if (confirmResolver) {
      confirmResolver(false);
      setConfirmResolver(null);
    }
    setActiveModal(null);
  }, [confirmResolver]);

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm, closeModal, activeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
