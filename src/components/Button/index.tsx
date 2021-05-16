import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

export default function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.outline} {...rest}>
        {children}
      </button>
    </div>
  );
}
