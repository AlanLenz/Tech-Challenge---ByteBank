import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import InputSelect from './index';

const transactionOptions = [
  { value: 'Deposit', label: 'Depósito' },
  { value: 'Transfer', label: 'Transferência' },
];

const categoryOptions = [
  { value: 'food', label: 'Alimentação' },
  { value: 'transport', label: 'Transporte' },
  { value: 'health', label: 'Saúde' },
  { value: 'education', label: 'Educação' },
  { value: 'entertainment', label: 'Lazer' },
];

const meta: Meta<typeof InputSelect> = {
  title: 'Components/Inputs/InputSelect',
  component: InputSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    bgColor: { control: 'color' },
    size: { control: 'radio', options: ['default', 'lg'] },
    options: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    label: 'Tipo de transação',
    value: '',
    placeholder: 'Selecione',
    options: transactionOptions,
    required: false,
    disabled: false,
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-64">
        <InputSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    label: 'Tipo de transação',
    value: 'Deposit',
  },
  render: (args) => (
    <div className="w-64">
      <InputSelect {...args} onChange={() => {}} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: 'Tipo de transação',
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <div className="w-64">
        <InputSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Tipo de transação',
    value: '',
    error: 'Selecione um tipo de transação.',
  },
  render: (args) => (
    <div className="w-64">
      <InputSelect {...args} onChange={() => {}} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Tipo de transação',
    value: 'Transfer',
    disabled: true,
  },
  render: (args) => (
    <div className="w-64">
      <InputSelect {...args} onChange={() => {}} />
    </div>
  ),
};

export const ManyOptions: Story = {
  args: {
    label: 'Categoria',
    options: categoryOptions,
    placeholder: 'Selecione uma categoria',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <div className="w-64">
        <InputSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const CustomBackground: Story = {
  args: {
    label: 'Fundo personalizado',
    options: transactionOptions,
    bgColor: '#E4EDE3',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <div className="w-64">
        <InputSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Large: Story = {
  args: {
    label: 'Tamanho grande (h-10)',
    options: transactionOptions,
    size: 'lg',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <div className="w-64">
        <InputSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
