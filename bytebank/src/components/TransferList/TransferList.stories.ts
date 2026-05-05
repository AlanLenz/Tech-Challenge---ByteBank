import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TransferList from './index';

const meta: Meta<typeof TransferList> = {
  title: 'Components/TransferList',
  component: TransferList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
