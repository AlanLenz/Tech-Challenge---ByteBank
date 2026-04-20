import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MenuItem from './index';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: { control: 'boolean' },
    hasDivider: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    label: 'Início',
    href: '#',
    isActive: true,
    hasDivider: true,
  },
};

export const Inactive: Story = {
  args: {
    label: 'Transferências',
    href: '#',
    isActive: false,
    hasDivider: true,
  },
};

export const WithoutDivider: Story = {
  args: {
    label: 'Outros serviços',
    href: '#',
    isActive: false,
    hasDivider: false,
  },
};
