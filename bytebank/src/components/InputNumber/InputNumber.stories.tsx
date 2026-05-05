import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import InputNumber from './index';

const meta: Meta<typeof InputNumber> = {
  title: 'Components/Inputs/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    bgColor: { control: 'color' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    onChange: { table: { disable: true } },
  },
  args: {
    label: 'Valor',
    value: '',
    placeholder: '0,00',
    required: false,
    disabled: false,
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <InputNumber {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    label: 'Valor da transferência',
    value: '250,00',
  },
  render: (args) => <InputNumber {...args} onChange={() => {}} />,
};

export const Required: Story = {
  args: {
    label: 'Valor',
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <InputNumber {...args} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    label: 'Valor',
    value: '',
    error: 'Informe um valor válido.',
  },
  render: (args) => <InputNumber {...args} onChange={() => {}} />,
};

export const Disabled: Story = {
  args: {
    label: 'Saldo disponível',
    value: '1.200,00',
    disabled: true,
  },
  render: (args) => <InputNumber {...args} onChange={() => {}} />,
};

export const CustomBackground: Story = {
  args: {
    label: 'Fundo personalizado',
    placeholder: '0,00',
    bgColor: '#E4EDE3',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <InputNumber {...args} value={value} onChange={setValue} />;
  },
};
