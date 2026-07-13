import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ExpenseCategoryChart } from './ExpenseCategoryChart';
import { mockTransfers } from '../dashboard.mocks';

const meta: Meta<typeof ExpenseCategoryChart> = {
  title: 'Components/Dashboard/Charts/ExpenseCategoryChart',
  component: ExpenseCategoryChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    transfers: mockTransfers,
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    transfers: [],
  },
};