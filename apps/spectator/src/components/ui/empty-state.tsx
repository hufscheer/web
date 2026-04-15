import type { ReactNode } from 'react';

import { Typography } from '@hcc/ui';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="my-4 flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl bg-(--color-greyscale-50)">
      <div className="flex flex-col items-center gap-2">
        {icon}
        <div className="flex flex-col items-center gap-1">
          <Typography
            className="text-center"
            color="var(--color-greyscale-300)"
            fontSize={16}
            weight="medium"
          >
            {title}
          </Typography>
          {description && (
            <Typography className="text-center" color="var(--color-greyscale-300)" fontSize={14}>
              {description}
            </Typography>
          )}
        </div>
      </div>
      {action}
    </div>
  );
};
