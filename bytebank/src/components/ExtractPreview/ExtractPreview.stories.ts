import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ExtractPreview from './index';

const meta: Meta<typeof ExtractPreview> = {
  title: 'Components/ExtractPreview',
  component: ExtractPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
