import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import React from 'react';
import MobileMenu from './index';

type MobileMenuStoryArgs = {
  forceVisible?: boolean;
};

const meta: Meta<MobileMenuStoryArgs> = {
  title: 'Components/MobileMenu',
  component: MobileMenu as React.ComponentType<MobileMenuStoryArgs>,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        push: fn(),
        replace: fn(),
        prefetch: fn(),
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        {
          onClick: (e: React.MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a')) e.preventDefault();
          },
        },
        React.createElement(Story),
      ),
  ],
  tags: ['autodocs'],
  argTypes: {
    forceVisible: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    forceVisible: true,
  },
};
