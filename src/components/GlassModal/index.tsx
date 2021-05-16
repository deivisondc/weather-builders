import { ReactNode } from 'react';
import Modal, { Props } from 'react-modal';

import styles from './styles.module.scss';

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
      ariaHideApp={false}
      {...rest}
    >
      {children}
    </Modal>
  );
}
