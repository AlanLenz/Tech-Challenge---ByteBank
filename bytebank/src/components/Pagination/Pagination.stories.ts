import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Pagination from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onPageChange: fn(),
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Página atualmente ativa',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total de páginas disponíveis',
    },
    onPageChange: {
      description: 'Callback disparado ao clicar em Anterior ou Próxima, recebe o número da nova página',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais para o elemento raiz',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
  },
};
