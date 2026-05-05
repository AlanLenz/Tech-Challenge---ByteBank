import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './index';

const meta: Meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deposito">Depósito</SelectItem>
        <SelectItem value="transferencia">Transferência</SelectItem>
        <SelectItem value="saque">Saque</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="w-48">
        <SelectValue placeholder="Selecione (sm)" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deposito">Depósito</SelectItem>
        <SelectItem value="transferencia">Transferência</SelectItem>
        <SelectItem value="saque">Saque</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Entradas</SelectLabel>
          <SelectItem value="deposito">Depósito</SelectItem>
          <SelectItem value="rendimento">Rendimento</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Saídas</SelectLabel>
          <SelectItem value="transferencia">Transferência</SelectItem>
          <SelectItem value="saque">Saque</SelectItem>
          <SelectItem value="pagamento">Pagamento</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="transferencia">
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deposito">Depósito</SelectItem>
        <SelectItem value="transferencia">Transferência</SelectItem>
        <SelectItem value="saque">Saque</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Desabilitado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deposito">Depósito</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deposito">Depósito</SelectItem>
        <SelectItem value="transferencia" disabled>
          Transferência (indisponível)
        </SelectItem>
        <SelectItem value="saque">Saque</SelectItem>
      </SelectContent>
    </Select>
  ),
};
