import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SelectInput from './SelectInput';

const meta: Meta<typeof SelectInput> = {
  title: 'Components/TransactionForm/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Tipo de transação',
    value: '',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    label: 'Tipo de transação',
    value: 'deposito',
    onChange: () => {},
  },
};
