import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

export default {
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
    },
  },
} satisfies Meta<typeof Button>;

export const Basic: StoryObj<typeof Button> = {};
