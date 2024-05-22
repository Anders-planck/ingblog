import { Meta } from '@storybook/react';
import { Header } from '@/components/Layout/Header';

const meta: Meta<typeof Header> = {
  component: Header,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = () => <Header />;
