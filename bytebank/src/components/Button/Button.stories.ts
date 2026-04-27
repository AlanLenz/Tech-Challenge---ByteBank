import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'destructive', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Concluir transação',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Já tenho conta',
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: 'Cancelar',
    variant: 'outline',
    size: 'md',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Excluir',
    variant: 'destructive',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ver mais',
    variant: 'ghost',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Abrir minha conta',
    variant: 'primary',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    children: 'Salvar',
    variant: 'primary',
    size: 'sm',
  },
};

export const Loading: Story = {
  args: {
    children: 'Salvando...',
    variant: 'primary',
    size: 'md',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Indisponível',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};
