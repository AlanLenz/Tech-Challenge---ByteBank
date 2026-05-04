import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import InputText from './index';

const meta: Meta<typeof InputText> = {
  title: 'Components/Inputs/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    bgColor: { control: 'color' },
    onChange: { table: { disable: true } },
  },
  args: {
    label: 'Nome',
    value: '',
    placeholder: 'Digite aqui',
    required: false,
    disabled: false,
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <InputText {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    label: 'Nome',
    value: 'Victor Oliveira',
  },
  render: (args) => <InputText {...args} onChange={() => {}} />,
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <InputText {...args} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'email-invalido',
    error: 'Formato de email inválido.',
  },
  render: (args) => <InputText {...args} onChange={() => {}} />,
};

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    value: 'Valor fixo',
    disabled: true,
  },
  render: (args) => <InputText {...args} onChange={() => {}} />,
};

export const CustomBackground: Story = {
  args: {
    label: 'Fundo personalizado',
    placeholder: 'Digite aqui',
    bgColor: '#E4EDE3',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <InputText {...args} value={value} onChange={setValue} />;
  },
};
