import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from './index';

const meta: Meta = {
  title: 'Components/Field',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <div className="w-80">
      <FieldGroup className='w-[300px]'>
        <Field orientation="vertical">
          <FieldLabel htmlFor="nome">Nome teste</FieldLabel>
          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
          />
        </Field>
        <Field orientation="vertical">
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
          />
        </Field>
      </FieldGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-96">
      <FieldGroup className='w-[300px]'>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="ativo">Ativo</FieldLabel>
          <FieldContent>
            <FieldTitle>Habilitar notificações</FieldTitle>
            <FieldDescription>
              Receba alertas sobre movimentações na sua conta.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="marketing">Marketing</FieldLabel>
          <FieldContent>
            <FieldTitle>Aceitar comunicações</FieldTitle>
            <FieldDescription>
              Receba ofertas e novidades por e-mail.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="w-80">
      <Field orientation="vertical">
        <FieldLabel htmlFor="cpf">CPF</FieldLabel>
        <input
          id="cpf"
          type="text"
          placeholder="000.000.000-00"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
        />
        <FieldDescription>
          Informe apenas números. Será usado para identificação.
        </FieldDescription>
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <Field orientation="vertical" data-invalid="true">
        <FieldLabel htmlFor="senha">Senha</FieldLabel>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          className="rounded-md border border-red-400 px-3 py-2 text-sm w-full"
        />
        <FieldError errors={[{ message: 'A senha deve ter no mínimo 8 caracteres.' }]} />
      </Field>
    </div>
  ),
};

export const WithMultipleErrors: Story = {
  render: () => (
    <div className="w-80">
      <Field orientation="vertical" data-invalid="true">
        <FieldLabel htmlFor="senha2">Senha</FieldLabel>
        <input
          id="senha2"
          type="password"
          className="rounded-md border border-red-400 px-3 py-2 text-sm w-full"
        />
        <FieldError
          errors={[
            { message: 'A senha deve ter no mínimo 8 caracteres.' },
            { message: 'A senha deve conter ao menos um número.' },
            { message: 'A senha deve conter ao menos uma letra maiúscula.' },
          ]}
        />
      </Field>
    </div>
  ),
};

export const WithFieldSet: Story = {
  render: () => (
    <div className="w-80">
      <FieldSet>
        <FieldLegend>Dados pessoais</FieldLegend>
        <FieldGroup className='w-[300px]'>
          <Field orientation="vertical">
            <FieldLabel htmlFor="fs-nome">Nome</FieldLabel>
            <input
              id="fs-nome"
              type="text"
              placeholder="Nome completo"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
            />
          </Field>
          <FieldSeparator />
          <Field orientation="vertical">
            <FieldLabel htmlFor="fs-nasc">Data de nascimento</FieldLabel>
            <input
              id="fs-nasc"
              type="date"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};

export const WithSeparatorLabel: Story = {
  render: () => (
    <div className="w-80">
      <FieldGroup className='w-[300px]'>
        <Field orientation="vertical">
          <FieldLabel htmlFor="s-email">E-mail</FieldLabel>
          <input
            id="s-email"
            type="email"
            placeholder="email@exemplo.com"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
          />
        </Field>
        <FieldSeparator>ou</FieldSeparator>
        <Field orientation="vertical">
          <FieldLabel htmlFor="s-telefone">Telefone</FieldLabel>
          <input
            id="s-telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
          />
        </Field>
      </FieldGroup>
    </div>
  ),
};
