import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Header from './index';

type HeaderStoryArgs = {
  displayName?: string;
};

const meta: Meta<HeaderStoryArgs> = {
  title: 'Components/Header',
  component: Header as React.ComponentType<HeaderStoryArgs>,
  parameters: {
    layout: 'fullscreen',
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
  argTypes: {
    displayName: {
      control: 'text',
      description: 'Nome do usuário exibido no header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayName: 'Usuário',
  },
};
