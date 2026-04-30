import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ExtractPreview from './index';

const sampleTransfers = [
  { id: '1', description: 'Salário', amount: 1500.0, date: '2025-12-20', type: 'Deposit' as const },
  { id: '2', description: 'Pix para Maria', amount: 250.0, date: '2025-12-18', type: 'Transfer' as const },
  { id: '3', description: 'Reembolso', amount: 120.0, date: '2025-12-15', type: 'Deposit' as const },
  { id: '4', description: 'Restaurante', amount: 500.0, date: '2025-12-10', type: 'Transfer' as const },
  { id: '5', description: 'Pagamento de Assinatura', amount: 69.9, date: '2025-12-05', type: 'Transfer' as const },
];

const meta: Meta<typeof ExtractPreview> = {
  title: 'Components/ExtractPreview',
  component: ExtractPreview,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='bg-zinc-300 flex items-center justify-center'>
        <div className='p-4 w-1/3'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = async () =>
        ({ ok: true, json: async () => sampleTransfers }) as Response;
      return <Story />;
    },
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = async () =>
        ({ ok: true, json: async () => [] }) as Response;
      return <Story />;
    },
  ],
};
