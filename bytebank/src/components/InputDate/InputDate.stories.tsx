import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import InputDate from './index';

const today = new Date().toISOString().split('T')[0];

const meta: Meta<typeof InputDate> = {
  title: 'Components/Inputs/InputDate',
  component: InputDate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    bgColor: { control: 'color' },
    min: { control: 'text' },
    max: { control: 'text' },
    onChange: { table: { disable: true } },
  },
  args: {
    label: 'Data',
    value: '',
    required: false,
    disabled: false,
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-64">
        <InputDate {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    label: 'Data da transação',
    value: today,
  },
  render: (args) => (
    <div className="w-64">
      <InputDate {...args} onChange={() => {}} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: 'Data',
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <div className="w-64">
        <InputDate {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Data',
    value: '',
    error: 'Informe uma data válida.',
  },
  render: (args) => (
    <div className="w-64">
      <InputDate {...args} onChange={() => {}} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Data de cadastro',
    value: today,
    disabled: true,
  },
  render: (args) => (
    <div className="w-64">
      <InputDate {...args} onChange={() => {}} />
    </div>
  ),
};

export const WithMinMax: Story = {
  args: {
    label: 'Data (apenas este mês)',
    min: `${today.slice(0, 7)}-01`,
    max: today,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <div className="w-64">
        <InputDate {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const CustomBackground: Story = {
  args: {
    label: 'Fundo personalizado',
    bgColor: '#E4EDE3',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <div className="w-64">
        <InputDate {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
