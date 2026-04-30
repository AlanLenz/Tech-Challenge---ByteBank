import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import LoginModal, { LoginForm } from './login-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer';
import Button from '@/components/Button';

const meta: Meta<typeof LoginModal> = {
  title: 'Components/Forms/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div className="flex h-[300px] items-center justify-center">
          <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
            Abrir modal
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Acesse sua conta</DialogTitle>
              <DialogDescription>
                Insira seus dados abaixo para acessar a Gestão Financeira.
              </DialogDescription>
            </DialogHeader>
            <LoginForm />
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

export const Mobile: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div className="flex h-[300px] items-center justify-center">
          <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
            Abrir modal
          </Button>
        </div>
        <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Acesse sua conta</DrawerTitle>
              <DrawerDescription>
                Insira seus dados abaixo para acessar a Gestão Financeira.
              </DrawerDescription>
            </DrawerHeader>
            <LoginForm className="px-4" />
            <DrawerFooter className="pt-2">
              <Button variant="neutral" size="sm" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
