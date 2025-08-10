import { HCCLogo } from '@hcc/icons';
import Link from 'next/link';
import { ROUTES } from '~/constants/routes';

export const Header = () => {
  return (
    <header className="sticky top-0 z-header row-between h-12 w-full border-neutral-100 border-b px-5">
      <Link className="flex items-end gap-2" href={ROUTES.HOME}>
        <HCCLogo width="71.5" height="21" className="text-neutral-900" />
        <span className="font-medium leading-none">매니저</span>
      </Link>
    </header>
  );
};
