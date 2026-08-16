import type { Meta } from '@storybook/react-vite';

import { Button } from '.';
import { Spinner } from '../spinner';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['primary', 'danger'],
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['solid', 'subtle', 'ghost'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export const Default: Meta<typeof Button> = {
  render: (args) => {
    const handleClick = () => {
      alert('Button clicked!');
    };

    return (
      <>
        <Button
          left={<span style={{ color: 'blue' }}>Left</span>}
          right={<span>Right</span>}
          onClick={handleClick}
          {...args}
        >
          Button
        </Button>
        <Button render={<a href="https://example.com">link</a>} {...args} />
      </>
    );
  },
};

export const Loading: Meta<typeof Button> = {
  render: (args) => (
    <>
      <Button loading left={<Spinner style={{ width: 12, height: 12 }} />} {...args}>
        Button
      </Button>
    </>
  ),
};
