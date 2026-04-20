import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextInput from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TransactionForm/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Valor',
    value: '',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    label: 'Valor',
    value: '150,00',
    onChange: () => {},
  },
};
