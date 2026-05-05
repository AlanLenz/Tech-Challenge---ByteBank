import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './index';
import Button from '@/components/Button';

const meta: Meta = {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="primary">Abrir drawer (baixo)</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Título do drawer</DrawerTitle>
          <DrawerDescription>
            Este drawer desliza a partir da parte inferior da tela.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="primary">Confirmar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="primary">Abrir drawer (esquerda)</Button>
      </DrawerTrigger>
      <DrawerContent className="w-[260px]">
        <DrawerHeader>
          <DrawerTitle>Menu lateral</DrawerTitle>
          <DrawerDescription>
            Este drawer desliza a partir da esquerda, ideal para menus de navegação.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 flex flex-col gap-2">
          <p className="text-sm text-gray-600">Item de menu 1</p>
          <p className="text-sm text-gray-600">Item de menu 2</p>
          <p className="text-sm text-gray-600">Item de menu 3</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Right: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="secondary">Abrir drawer (direita)</Button>
      </DrawerTrigger>
      <DrawerContent className="w-[260px]">
        <DrawerHeader>
          <DrawerTitle>Detalhes</DrawerTitle>
          <DrawerDescription>
            Este drawer desliza a partir da direita, ideal para painéis de detalhes.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 flex flex-col gap-3">
          <div>
            <p className="text-xs text-gray-500">Descrição</p>
            <p className="text-sm font-medium">Depósito em conta</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Valor</p>
            <p className="text-sm font-medium text-green-700">R$ 1.500,00</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Data</p>
            <p className="text-sm font-medium">04/05/2026</p>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Top: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir drawer (topo)</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notificação</DrawerTitle>
          <DrawerDescription>
            Este drawer desliza a partir do topo da tela.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="primary">Entendido</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
