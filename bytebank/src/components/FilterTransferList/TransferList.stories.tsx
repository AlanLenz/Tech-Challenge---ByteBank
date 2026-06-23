import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FilterTransferList from './index';

const meta: Meta<typeof FilterTransferList> = {
  title: 'Components/FilterTransferList',
  component: FilterTransferList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='bg-zinc-300 flex items-center justify-center'>
        <div className='p-4'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
