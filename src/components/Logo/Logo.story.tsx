import { Meta } from '@storybook/react';
import IsaBlogLogo from '@/components/Logo/index';

const meta: Meta<typeof IsaBlogLogo> = {
  component: IsaBlogLogo,
  title: 'Components/Logo',
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = () => <IsaBlogLogo size={32} />;
