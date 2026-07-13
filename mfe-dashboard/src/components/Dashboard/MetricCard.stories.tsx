import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import { MetricCard } from './MetricCard';
import PaymentMethod from '../../../assets/payment-method-pay-svgrepo-com.svg';

const meta: Meta<typeof MetricCard> = {
  title: 'Components/Dashboard/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    title: 'Entradas',
    value: 'R$ 5.000,00',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Rótulo exibido acima do valor',
    },
    value: {
      control: 'text',
      description: 'Valor em destaque exibido no card',
    },
    icon: {
      control: false,
      description: 'Ícone opcional exibido ao lado do título',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    title: 'Transações',
    value: '24',
    icon: <Image src={PaymentMethod} alt="Transações" width={20} height={20} />,
  },
};