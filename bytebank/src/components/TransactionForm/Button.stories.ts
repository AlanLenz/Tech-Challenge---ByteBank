import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Concluir transação',
    type: 'button',
  },
};

export const Submit: Story = {
  args: {
    children: 'Confirmar',
    type: 'submit',
  },
};
