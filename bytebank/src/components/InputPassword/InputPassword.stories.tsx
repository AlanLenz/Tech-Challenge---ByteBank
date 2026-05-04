import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import InputPassword from './index';

const meta: Meta<typeof InputPassword> = {
  title: 'Components/Inputs/InputPassword',
  component: InputPassword,
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
    label: 'Senha',
    value: '',
    placeholder: '••••••••',
    required: false,
    disabled: false,
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <InputPassword {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    label: 'Senha',
    value: 'senha123',
  },
  render: (args) => <InputPassword {...args} onChange={() => {}} />,
};

export const Required: Story = {
  args: {
    label: 'Senha',
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <InputPassword {...args} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    label: 'Senha',
    value: '123',
    error: 'A senha deve ter pelo menos 6 caracteres.',
  },
  render: (args) => <InputPassword {...args} onChange={() => {}} />,
};

export const Disabled: Story = {
  args: {
    label: 'Senha',
    value: 'senha-salva',
    disabled: true,
  },
  render: (args) => <InputPassword {...args} onChange={() => {}} />,
};

export const CustomBackground: Story = {
  args: {
    label: 'Fundo personalizado',
    bgColor: '#E4EDE3',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <InputPassword {...args} value={value} onChange={setValue} />;
  },
};
