'use client';
import { TabNavigation } from '~/app/landingpage/_components/TabNavigation';
import { useState } from 'react';

const Page = () => {
  const [activeTab, setActiveTab] = useState('recent');
  return (
    <>
      <TabNavigation activeTab={activeTab} onTabClick={setActiveTab} />
      {/**내용* - 클릭한 tab에 대한 내용 랜더링*/}
    </>
  );
};
export default Page;
