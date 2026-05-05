import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm cursor-pointer select-none">
        Aceito os termos e condições
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(val) => setChecked(val === true)}
          />
          <label htmlFor="controlled" className="text-sm cursor-pointer select-none">
            {checked ? 'Marcado' : 'Desmarcado'}
          </label>
        </div>
        <p className="text-xs text-gray-500">Estado: {String(checked)}</p>
      </div>
    );
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {['Conta corrente', 'Conta PJ', 'Cartão de crédito'].map((label) => (
        <div key={label} className="flex items-center gap-2">
          <Checkbox id={label} />
          <label htmlFor={label} className="text-sm cursor-pointer select-none">
            {label}
          </label>
        </div>
      ))}
    </div>
  ),
};
