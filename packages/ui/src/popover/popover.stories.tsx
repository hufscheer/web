import type { StoryObj } from '@storybook/react-vite';

import { Button } from '../button';
import { Popover } from './popover';
import * as PopoverPrimitive from './primitives';

export default {
  title: 'Popover',
  component: Popover,
};

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: ({ label = 'Example Popover', ...props }) => {
    return (
      <Popover trigger={<button>Open Popover</button>} label={label} {...props}>
        <div>내용</div>
      </Popover>
    );
  },
};

export const Custom: Story = {
  render: (props) => {
    return (
      <PopoverPrimitive.Root {...props}>
        <PopoverPrimitive.Trigger
          render={<Button variant="ghost">Open Popover</Button>}
          delay={0}
          closeDelay={0}
        />

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner>
            <PopoverPrimitive.Popup aria-label="Example Popover">
              <div>내용</div>
              <PopoverPrimitive.Arrow />
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
};
