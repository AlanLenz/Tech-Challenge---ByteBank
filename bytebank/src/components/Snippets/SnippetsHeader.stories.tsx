import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import SnippetsHeader from './header';

const meta: Meta<typeof SnippetsHeader> = {
  title: 'Components/Snippets/Header',
  component: SnippetsHeader,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: fn(),
        replace: fn(),
        prefetch: fn(),
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
