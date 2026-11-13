import type { Metadata } from 'next';

import { PolicyLayout, PolicySection } from '../_components/policy-layout';

export const metadata: Metadata = { title: '개인정보처리방침' };

const CONTACT_EMAIL = 'hufscheercheer2@gmail.com';

export default function Page() {
  return (
    <PolicyLayout title="개인정보처리방침" effectiveDate="2026년 10월 13일">
      <p>
        훕치치(이하 &quot;서비스&quot;)는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 등
        관련 법령을 지킵니다. 이 방침은 훕치치 웹사이트(hufscheer.com)와 훕치치 iOS 앱에 적용됩니다.
      </p>

      <PolicySection title="1. 회원가입 없이 이용합니다">
        <p>
          관람객은 회원가입이나 로그인 없이 서비스를 이용합니다. 이름, 전화번호, 이메일 같은 정보를
          관람객에게 받지 않습니다.
        </p>
      </PolicySection>

      <PolicySection title="2. 처리하는 정보와 목적">
        <ul>
          <li>
            <strong>익명 방문자 식별값</strong>: 접속할 때 무작위로 만든 값(쿠키, 7일 보관)입니다.
            응원 횟수·응원톡의 도배를 막고, 이용자가 특정 작성자의 응원톡을 숨길 수 있도록 응원톡에
            이 값을 되돌릴 수 없게 변환(해시)한 값을 함께 저장합니다.
          </li>
          <li>
            <strong>응원톡</strong>: 내용, 작성 시각, 응원한 팀. 경기 화면에 보여 주기 위해
            처리합니다.
          </li>
          <li>
            <strong>알림 정보(앱)</strong>: 알림을 켠 기기의 푸시 토큰, 기기 종류(iOS), 알림을
            받기로 한 경기·학교. 경기 알림을 보내기 위해 처리합니다.
          </li>
          <li>
            <strong>접속 기록</strong>: IP 주소, 요청 시각과 주소, 앱 버전·빌드 번호. 서비스 안정성
            확인과 부정 이용 방지를 위해 처리합니다.
          </li>
          <li>
            <strong>이용 통계(웹)</strong>: Google Analytics, Google Tag Manager, Vercel Analytics가
            방문 페이지, 기기·브라우저 종류 같은 이용 정보를 수집합니다. 서비스 개선에 씁니다.
          </li>
          <li>
            <strong>대회 운영 정보</strong>: 대회 매니저가 등록하는 선수의 이름·학번·등번호와 매니저
            계정(이메일, 암호화된 비밀번호). 경기 기록과 라인업을 보여 주고 대회를 운영하기 위해
            처리합니다.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="3. 보관 기간과 파기">
        <ul>
          <li>익명 방문자 식별값(쿠키): 7일. 브라우저나 앱에서 지우면 바로 사라집니다.</li>
          <li>푸시 토큰과 알림 설정: 알림을 끄거나 앱을 지워 토큰이 무효가 되면 삭제합니다.</li>
          <li>접속 기록: 5일 보관 후 자동 삭제합니다.</li>
          <li>
            응원톡, 선수·경기 기록: 서비스가 운영되는 동안 보관하며, 삭제 요청을 받으면 지웁니다.
          </li>
        </ul>
        <p>보관 기간이 지나거나 목적을 이룬 정보는 복구할 수 없는 방법으로 지체 없이 파기합니다.</p>
      </PolicySection>

      <PolicySection title="4. 제3자 제공">
        <p>이용자의 정보를 제3자에게 팔거나 제공하지 않습니다. 광고·추적 목적으로 쓰지 않습니다.</p>
      </PolicySection>

      <PolicySection title="5. 처리 위탁과 국외 이전">
        <p>서비스 운영을 위해 아래 업체의 서비스를 이용합니다.</p>
        <ul>
          <li>Amazon Web Services(서버·데이터 보관, 서울 리전)</li>
          <li>Cloudflare(접속 연결·보안, 미국 등)</li>
          <li>Vercel(웹사이트 호스팅·이용 통계, 미국)</li>
          <li>Google(Firebase Cloud Messaging 알림 전송, Google Analytics, Gemini API, 미국)</li>
          <li>OpenRouter(응원톡 부적절 표현 걸러내기·AI 기능, 미국)</li>
          <li>Hugging Face(응원톡 부적절 표현 판별, 미국)</li>
        </ul>
        <p>
          응원톡 내용은 부적절한 표현을 걸러내기 위해 위 AI 서비스로 전송되어 처리됩니다. 알림을
          위해 푸시 토큰이 Google로 전송됩니다. 국외 이전을 원하지 않으면 응원톡을 작성하지 않거나
          알림을 끄면 됩니다.
        </p>
      </PolicySection>

      <PolicySection title="6. 이용자의 권리">
        <p>
          이용자는 언제든지 자신의 정보에 대해 열람·정정·삭제·처리정지를 요청할 수 있습니다. 응원톡
          삭제를 원하면 경기, 작성 시각, 내용을 적어 아래 연락처로 보내 주세요. 회원 정보가 없으므로
          이 정보로 해당 응원톡을 찾아 삭제합니다.
        </p>
        <p>
          알림은 앱의 MY 탭이나 기기 설정에서 끌 수 있고, 쿠키는 브라우저 설정에서 지우거나 거부할
          수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="7. 안전성 확보 조치">
        <p>
          비밀번호는 암호화해 저장하고, 서버 접근 권한을 최소한으로 관리하며, 비밀 키는 별도
          보관소에 두고 주기적으로 점검합니다.
        </p>
      </PolicySection>

      <PolicySection title="8. 개인정보 보호책임자와 문의">
        <p>
          훕치치 운영팀 · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          개인정보 침해에 대한 신고나 상담은 개인정보침해신고센터(privacy.kisa.or.kr, 국번 없이
          118)에 할 수도 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="9. 방침의 변경">
        <p>이 방침이 바뀌면 이 페이지에 시행일과 함께 알립니다.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
