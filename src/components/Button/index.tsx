import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <div>
      <button type="button" className={styles.outline}>
        {children}
      </button>
    </div>
  );
}
