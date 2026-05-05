import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FooterCustom from './index';

const meta: Meta<typeof FooterCustom> = {
  title: 'Components/FooterCustom',
  component: FooterCustom,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
