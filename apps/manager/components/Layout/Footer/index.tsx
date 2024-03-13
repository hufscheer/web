'use client';

import { SymbolIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import * as styles from './Footer.css';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <Icon source={SymbolIcon} size="md" color="gray" />
    </footer>
  );
}
