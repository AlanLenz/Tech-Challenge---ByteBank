import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Hero from './index';

type HeroStoryArgs = {
  displayName?: string;
  balance?: string;
};

const meta: Meta<HeroStoryArgs> = {
  title: 'Components/Hero',
  component: Hero as React.ComponentType<HeroStoryArgs>,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    displayName: {
      control: 'text',
      description: 'Nome do usuário exibido na saudação',
    },
    balance: {
      control: 'text',
      description: 'Valor do saldo exibido ao revelar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayName: 'Usuário',
    balance: 'R$ 2.500,00',
  },
};
