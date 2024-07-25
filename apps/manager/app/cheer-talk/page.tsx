'use client';
import { Tabs } from '@hcc/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Layout from '@/components/Layout';

import CheerTalkList from './_components/CheerTalkList';
import * as styles from './page.css';

const tabs = [
  {
    key: 'all',
    label: '전체 응원톡',
    renderer: () => <CheerTalkList type="all" />,
  },
  {
    key: 'reported',
    label: '신고된 응원톡',
    renderer: () => <CheerTalkList type="reported" />,
  },
];

export default function Page() {
  return (
    <Layout
      navigationTitle="응원톡 관리"
      navigationMenu={<Link href={`/cheer-talk/blocked`}>가려진 목록</Link>}
    >
      <Tabs className={styles.tab} defaultValue="all">
        <Tabs.List>
          {({ value }) => (
            <div className={styles.tabListContainer}>
              <motion.span
                className={styles.tabIndicator}
                initial={{ x: 0 }}
                animate={{ x: value === 'all' ? 0 : 'calc(100% + 6px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />

              {tabs.map(tab => (
                <Tabs.Trigger
                  key={tab.key}
                  value={tab.key}
                  className={state => styles.tabButton({ state })}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </div>
          )}
        </Tabs.List>

        {tabs.map(tab => (
          <Tabs.Content
            key={tab.key}
            value={tab.key}
            className={styles.tabContent}
          >
            {tab.renderer()}
          </Tabs.Content>
        ))}
      </Tabs>
    </Layout>
  );
}
