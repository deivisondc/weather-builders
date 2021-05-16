import { ReactNode } from 'react';
import Modal, { Props } from 'react-modal';

import styles from './styles.module.scss';

Modal.setAppElement('#__next');

interface GlassModalProps extends Props {
  children: ReactNode;
  square: boolean;
}

export default function GlassModal({
  children,
  square,
  ...rest
}: GlassModalProps) {
  return (
    <Modal
      className={`${styles.modal} ${square && styles.modalSquare}`}
      overlayClassName={styles.overlay}
      {...rest}
    >
      {children}
    </Modal>
  );
}
