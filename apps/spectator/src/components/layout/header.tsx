import { HCCLogo } from '@hcc/icons';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="center sticky top-0 z-header h-[44px] w-full border-neutral-100 border-b">
      <Link href="/">
        <HCCLogo width="71.5" height="21" className="text-primary-500" />
      </Link>
    </header>
  );
};
