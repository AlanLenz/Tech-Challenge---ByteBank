import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RegisterModal from './register-form';

const meta: Meta<typeof RegisterModal> = {
  title: 'Components/Forms/RegisterModal',
  component: RegisterModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};
