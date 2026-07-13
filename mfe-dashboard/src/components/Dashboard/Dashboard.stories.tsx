import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Dashboard } from './Dashboard';
import { mockTransfers } from './dashboard.mocks';

const meta: Meta<typeof Dashboard> = {
  title: 'Components/Dashboard/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    transfers: mockTransfers,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    transfers: [],
  },
};