import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
};

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Digite seu nome',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@exemplo.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Digite sua senha',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
};

export const WithValue: Story = {
  args: {
    type: 'text',
    defaultValue: 'Valor preenchido',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Campo desabilitado',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    type: 'text',
    defaultValue: 'Valor inválido',
    'aria-invalid': true,
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};
