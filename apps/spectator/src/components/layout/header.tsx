import { HCCLogo } from '@hcc/icons';
import Link from 'next/link';
import { ROUTES } from '~/constants/routes';

export const Header = () => {
  return (
    <header className="sticky top-0 z-header row-between h-[44px] w-full border-neutral-100 border-b px-5">
      <Link href={ROUTES.HOME}>
        <HCCLogo width="71.5" height="21" className="text-primary-500" />
      </Link>
    </header>
  );
};
