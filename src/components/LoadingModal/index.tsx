import { VscLoading } from 'react-icons/vsc';

import GlassModal from '../GlassModal';

import styles from './styles.module.scss';

interface LoadingModalProps {
  isOpen: boolean;
}

export default function LoadingModal({ isOpen }: LoadingModalProps) {
  return (
    <GlassModal testId="loadingModal-test" square isOpen={isOpen}>
      <VscLoading className={styles.rotatingIcon} size={48} />
    </GlassModal>
  );
}
