'use client';
import { Button, useToast } from '@hcc/ui';
import { useState } from 'react';

import AlertDialog from '@/components/AlertDialog';

import * as styles from './CheerTalkList.css';
import { config, cheerTalks } from './constants';
import { CheerTalkFeatureKeys } from './types';
import CheerTalkCard from '../CheerTalkCard';

type CheerTalkListProps = {
  type: CheerTalkFeatureKeys;
};

const CheerTalkList = ({ type }: CheerTalkListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleCheerTalk = (cheerTalkId: number) => {
    if (config[type].showDialog) {
      alert(cheerTalkId);
      setIsOpen(true);
    } else {
      toast({
        title: config[type].toastMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {cheerTalks.map((cheerTalk, index) => (
        <div key={cheerTalk.cheerTalkId} className={styles.cardContainer}>
          <CheerTalkCard cheerTalk={cheerTalk} />
          <Button
            colorScheme={config[type].buttonColorScheme}
            size="xs"
            fullWidth
            onClick={() => handleCheerTalk(cheerTalk.cheerTalkId)}
          >
            {config[type].buttonText}
          </Button>

          {cheerTalks.length - 1 !== index && (
            <hr className={styles.cardDivider} />
          )}
        </div>
      ))}

      <p>{type}</p>
      <AlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="해당 채팅 가리기를 해제 할게요"
        description="보류 해제 시 채팅이 응원톡에 노출됩니다. "
      />
    </>
  );
};

export default CheerTalkList;
