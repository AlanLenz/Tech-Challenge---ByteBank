import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './index';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Nome completo',
  },
};

export const WithHtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Label htmlFor="input-nome">Nome completo</Label>
      <input
        id="input-nome"
        type="text"
        placeholder="Digite seu nome"
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-1" data-disabled="true">
      <Label htmlFor="input-disabled">Campo desabilitado</Label>
      <input
        id="input-disabled"
        type="text"
        placeholder="Não disponível"
        disabled
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  ),
};

export const WithRequired: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Label htmlFor="input-req">
        E-mail
        <span className="text-red-500 ml-0.5">*</span>
      </Label>
      <input
        id="input-req"
        type="email"
        placeholder="email@exemplo.com"
        required
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Label htmlFor="input-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Usuário
      </Label>
      <input
        id="input-icon"
        type="text"
        placeholder="Digite seu usuário"
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  ),
};
