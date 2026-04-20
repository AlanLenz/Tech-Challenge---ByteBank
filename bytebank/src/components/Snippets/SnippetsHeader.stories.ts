import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SnippetsHeader from './header';

const meta: Meta<typeof SnippetsHeader> = {
  title: 'Components/Snippets/Header',
  component: SnippetsHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
