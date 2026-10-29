import type { Metadata } from 'next';

import { routes } from '~/constants/routes';

import { PolicyLayout, PolicySection } from '../_components/policy-layout';

export const metadata: Metadata = { title: '고객 지원' };

const CONTACT_EMAIL = 'hufscheercheer2@gmail.com';

export default function Page() {
  return (
    <PolicyLayout title="고객 지원">
      <p>훕치치는 대학 스포츠 경기의 점수와 진행 상황을 실시간으로 보여 주는 서비스입니다.</p>

      <PolicySection title="문의">
        <p>
          서비스 이용 중 궁금한 점, 오류, 부적절한 응원톡 신고, 개인정보 관련 요청은 아래 메일로
          보내 주세요.
        </p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </PolicySection>

      <PolicySection title="자주 묻는 질문">
        <ul>
          <li>
            <strong>로그인이 필요한가요?</strong> 아니요. 학교만 고르면 바로 볼 수 있습니다.
          </li>
          <li>
            <strong>경기 알림은 어떻게 받나요?</strong> 앱의 경기 화면에서 종 아이콘을 누르거나, MY
            탭에서 우리 학교 모든 경기 알림을 켜세요.
          </li>
          <li>
            <strong>불쾌한 응원톡을 봤어요.</strong> 응원톡의 &quot;신고&quot;를 눌러 신고하거나, 그
            사용자의 응원톡을 숨길 수 있습니다. 신고된 응원톡은 검토 후 가려집니다.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="개인정보처리방침">
        <p>
          <a href={routes.privacy}>개인정보처리방침 보기</a>
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
