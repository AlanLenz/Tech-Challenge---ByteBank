import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SideMenu from './index';

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='bg-zinc-300 w-[900px] flex items-center justify-center'>
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
