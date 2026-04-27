import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ExtractPreview from './index';

const sampleTransfers = [
  { id: '1', description: 'Compra no Supermercado', amount: 150.0, date: '2025-12-20', type: 'Deposit' as const },
  { id: '2', description: 'Pix para Maria', amount: 250.0, date: '2025-12-18', type: 'Transfer' as const },
  { id: '3', description: 'Reembolso', amount: 120.0, date: '2025-12-15', type: 'Deposit' as const },
  { id: '4', description: 'Restaurante', amount: 500.0, date: '2025-12-10', type: 'Transfer' as const },
  { id: '5', description: 'Pagamento de Assinatura', amount: 69.9, date: '2025-12-05', type: 'Transfer' as const },
];

const meta: Meta<typeof ExtractPreview> = {
  title: 'Components/ExtractPreview',
  component: ExtractPreview,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'brand',
      values: [{ name: 'brand', value: '#E4EDE3' }],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    transfers: sampleTransfers,
  },
};
