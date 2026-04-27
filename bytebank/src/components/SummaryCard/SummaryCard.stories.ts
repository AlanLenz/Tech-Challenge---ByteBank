import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SummaryCard from './index';

const meta: Meta<typeof SummaryCard> = {
  title: 'Components/SummaryCard',
  component: SummaryCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['deposit', 'transfer', 'records'],
      description: 'Define a variação visual do card',
    },
    label: {
      control: 'text',
      description: 'Texto do label exibido acima do valor',
    },
    value: {
      control: 'text',
      description: 'Valor exibido no card (string ou número)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Deposit: Story = {
  args: {
    variant: 'deposit',
    label: 'Depositos',
    value: 'R$ 420,00',
  },
};

export const Transfer: Story = {
  args: {
    variant: 'transfer',
    label: 'Transferencias',
    value: 'R$ 569,90',
  },
};

export const Records: Story = {
  args: {
    variant: 'records',
    label: 'Registros',
    value: 6,
  },
};
