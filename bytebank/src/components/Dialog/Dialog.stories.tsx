import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './index';
import Button from '@/components/Button';

const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Abrir dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Título do dialog</DialogTitle>
          <DialogDescription>
            Esta é a descrição do dialog. Aqui você pode colocar informações adicionais sobre a ação.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
          <Button variant="primary">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir sem botão de fechar</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Sem botão de fechar</DialogTitle>
          <DialogDescription>
            Este dialog não exibe o botão X no canto. O usuário deve usar os botões do rodapé.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="neutral">Cancelar</Button>
          </DialogClose>
          <Button variant="primary">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooterCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Abrir com rodapé</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar operação</DialogTitle>
          <DialogDescription>
            Deseja realmente realizar esta operação? Os dados serão salvos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="primary">Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Abrir dialog controlado
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Dialog controlado</DialogTitle>
              <DialogDescription>
                Este dialog é controlado por estado externo via <code>open</code> e <code>onOpenChange</code>.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="neutral" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setSaved(true);
                  setOpen(false);
                }}
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {saved && (
          <p className="text-sm font-medium text-green-700">Ação confirmada!</p>
        )}
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Editar informações</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações abaixo e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nome</label>
            <input
              type="text"
              defaultValue="Victor"
              className="h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D61]/30"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">E-mail</label>
            <input
              type="email"
              defaultValue="victor@bytebank.com"
              className="h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D61]/30"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="primary">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
