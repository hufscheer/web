import { Button, Select } from '@mantine/core';

import * as styles from './page.css';

export default function Page(): JSX.Element {
  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      훕치치 매니저
      <Select
        label="라운드"
        placeholder="골라봐"
        data={['16강', '8강', '4강', '결승']}
      />
      <Button>버튼</Button>
      <Button variant="light">버튼</Button>
      <Button variant="subtle">버튼</Button>
      <Button variant="gradient">버튼</Button>
      <Button variant="outline">버튼</Button>
      <Button variant="transparent">버튼</Button>
      <Button variant="white">버튼</Button>
      <Button className={styles.customButtonStyle}>버튼</Button>
    </main>
  );
}
