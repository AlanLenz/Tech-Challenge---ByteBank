import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from './index';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 flex flex-col gap-3">
      <p className="text-sm">Item acima</p>
      <Separator className='bg-black h-px'/>
      <p className="text-sm">Item abaixo</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <p className="text-sm">Esquerda</p>
      <Separator orientation="vertical" className='bg-black h-4' />
      <p className="text-sm">Direita</p>
    </div>
  ),
};

export const BetweenSections: Story = {
  render: () => (
    <div className="w-72 flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium">Dados pessoais</p>
        <p className="text-xs text-gray-500">Nome, CPF e data de nascimento</p>
      </div>
      <Separator className='bg-black h-px' />
      <div>
        <p className="text-sm font-medium">Dados bancários</p>
        <p className="text-xs text-gray-500">Agência e conta</p>
      </div>
      <Separator className='bg-black h-px' />
      <div>
        <p className="text-sm font-medium">Contato</p>
        <p className="text-xs text-gray-500">E-mail e telefone</p>
      </div>
    </div>
  ),
};

export const InNavigation: Story = {
  render: () => (
    <nav className="flex items-center gap-2 text-sm">
      <a href="#" className="hover:underline">Início</a>
      <Separator orientation="vertical" className="bg-black h-4" />
      <a href="#" className="hover:underline">Extrato</a>
      <Separator orientation="vertical" className="bg-black h-4" />
      <a href="#" className="hover:underline">Transferências</a>
    </nav>
  ),
};
