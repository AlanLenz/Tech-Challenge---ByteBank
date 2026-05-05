import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FeedbackModal from './index';

const meta: Meta<typeof FeedbackModal> = {
  title: 'Components/FeedbackModal',
  component: FeedbackModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true,
    onClose: () => {},
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '400px', transform: 'translateZ(0)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Transação realizada com sucesso!',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Ocorreu um erro ao processar a transação.',
  },
};
