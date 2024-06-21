import * as React from 'react';
import type { Preview } from '@storybook/react';

import '@hcc/styles/dist/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ width: '393px' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
