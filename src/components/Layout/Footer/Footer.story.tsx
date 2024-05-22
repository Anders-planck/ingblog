import { Meta } from '@storybook/react';
import { Footer } from '@/components/Layout/Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = () => <Footer />;
