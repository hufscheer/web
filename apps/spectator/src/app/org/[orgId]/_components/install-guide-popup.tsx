'use client';

import { Checkbox, Modal } from '@hcc/ui';
import Image from 'next/image';
import { useState } from 'react';

import { useInstallGuidePopup } from '../_hooks/useInstallGuidePopup';

const INSTALL_GUIDE_URL = 'https://lavish-beef-3dd.notion.site/407f63379d9280e2a818d952d74b114c';

export const InstallGuidePopup = () => {
  const { open, close } = useInstallGuidePopup();
  const [hideToday, setHideToday] = useState(false);

  return (
    <Modal open={open}>
      {/* 바깥 영역 클릭·ESC로는 닫히지 않고, 닫기 버튼으로만 닫힌다. */}
      <Modal.Content
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        // 화면 높이가 낮으면 (높이 - 여백 64px - 하단 바 56px)에 맞춰 너비를 줄여, 이미지 비율과 클릭 영역 위치를 유지한다.
        className="w-[min(340px,calc(100vw_-_48px),calc((100dvh_-_120px)_*_680_/_1114))] overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <Modal.Title className="sr-only">훕치치 홈 화면에 추가하기</Modal.Title>
        <Modal.Description className="sr-only">
          홈 화면에 추가하면 경기 시작·종료·득점 알림을 받을 수 있어요.
        </Modal.Description>

        <div className="relative aspect-[680/1114]">
          <Image
            src="/images/install-guide-popup.webp"
            alt="훕치치 홈 화면에 추가하고, 우리 팀 경기 알림 받자! 홈 화면에서 한 번에 접속! 경기 시작·종료·득점 알림까지!"
            fill
            priority
            sizes="340px"
            className="object-cover object-top"
          />
          {/* 이미지에 포함된 '설치 안내 가이드 보러가기' 버튼 위치에 맞춘 클릭 영역 */}
          <a
            href={INSTALL_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="설치 안내 가이드 보러가기"
            className="absolute top-[52.6%] left-[24.5%] h-[6.3%] w-[52.3%] rounded-full"
          />
        </div>

        <div className="flex h-14 shrink-0 items-center justify-between px-5">
          <Checkbox
            label="오늘 하루 보지않기"
            checked={hideToday}
            onCheckedChange={(checked) => setHideToday(checked)}
          />
          <button
            type="button"
            onClick={() => close(hideToday)}
            className="text-sm text-neutral-800"
          >
            닫기
          </button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
