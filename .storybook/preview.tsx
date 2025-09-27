import '../src/index.css';

import React from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import type { Preview, ReactRenderer } from '@storybook/react-vite';
import type { DocsContainerProps } from '@storybook/addon-docs/blocks';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      container: (props: DocsContainerProps<ReactRenderer>) => {
        try {
          const { getStoryContext, storyById } = props.context;

          const globals = getStoryContext(storyById()).globals;
          const theme = globals.theme === 'dark' ? themes.dark : themes.light;
          return <DocsContainer {...props} theme={theme} />;
        } catch {
          return <DocsContainer {...props} />;
        }
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
