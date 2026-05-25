import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import InputFile from './index';

const meta: Meta<typeof InputFile> = {
  title: 'Components/Inputs/InputFile',
  component: InputFile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    accept: { control: 'text' },
    onChange: { table: { disable: true } },
  },
  args: {
    label: 'Comprovante',
    value: null,
    accept: 'image/*,application/pdf',
    onChange: () => {},
  },
  render: (args) => {
    const [file, setFile] = useState<File | null>(args.value);
    return <InputFile {...args} value={file} onChange={setFile} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFile: Story = {
  render: (args) => {
    const mockFile = new File(['conteudo'], 'comprovante.pdf', { type: 'application/pdf' });
    const [file, setFile] = useState<File | null>(mockFile);
    return <InputFile {...args} value={file} onChange={setFile} />;
  },
};
