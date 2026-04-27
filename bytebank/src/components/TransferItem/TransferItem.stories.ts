import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import TransferItem from './index';

const meta: Meta<typeof TransferItem> = {
  title: 'Components/TransferItem',
  component: TransferItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onDraftChange: fn(),
    onSave: fn(),
    onCancel: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Deposit: Story = {
  args: {
    item: {
      id: '1',
      description: 'Compra no Supermercado',
      amount: 150,
      date: '2025-08-18',
      type: 'Deposit',
    },
    isEditing: false,
    draft: {
      description: 'Compra no Supermercado',
      amount: 150,
      date: '2025-08-18',
      type: 'Deposit',
    },
  },
};

export const Transfer: Story = {
  args: {
    item: {
      id: '2',
      description: 'Pix para Maria',
      amount: 250,
      date: '2025-11-02',
      type: 'Transfer',
    },
    isEditing: false,
    draft: {
      description: '',
      amount: 0,
      date: '',
      type: 'Deposit',
    },
  },
};

export const Editing: Story = {
  args: {
    item: {
      id: '3',
      description: 'Restaurante',
      amount: 500,
      date: '2025-11-21',
      type: 'Transfer',
    },
    isEditing: true,
    draft: {
      description: 'Restaurante',
      amount: 500,
      date: '2025-11-21',
      type: 'Transfer',
    },
  },
};
