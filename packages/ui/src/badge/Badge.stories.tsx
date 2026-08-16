import type { Meta } from '@storybook/react-vite';

import { Badge } from './Badge';

export default {
  title: 'Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export const Default: Meta<typeof Badge> = {
  render: () => <Badge>Badge</Badge>,
};
