import type { ReactNode } from 'react';

type PolicyLayoutProps = {
  title: string;
  effectiveDate?: string;
  children: ReactNode;
};

// 개인정보처리방침·고객 지원처럼 학교 선택 없이 열리는 안내 문서 페이지
export const PolicyLayout = ({ title, effectiveDate, children }: PolicyLayoutProps) => (
  <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-5 py-10 text-sm leading-relaxed text-(--color-greyscale-700) [&_a]:text-(--color-primary-600) [&_a]:underline [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5">
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold text-(--color-greyscale-900)">{title}</h1>
      {effectiveDate && <p className="text-(--color-greyscale-500)">시행일: {effectiveDate}</p>}
    </header>
    {children}
  </main>
);

type PolicySectionProps = {
  title: string;
  children: ReactNode;
};

export const PolicySection = ({ title, children }: PolicySectionProps) => (
  <section className="flex flex-col gap-2">
    <h2 className="text-base font-semibold text-(--color-greyscale-900)">{title}</h2>
    {children}
  </section>
);
