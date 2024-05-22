import '@mantine/core/styles.css';
import React, { useEffect } from 'react';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import { theme } from '../src/theme';
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';
import { Preview } from '@storybook/react';
import { router } from '../src/Router';
import store from '../src/store';
import { Provider } from 'react-redux';

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) => setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => <MantineProvider theme={theme}>{renderStory()}</MantineProvider>,
  withRouter,
  (renderStory: any) => <Provider store={store}>{renderStory()}</Provider>,
];

export const tags = ['autodocs', 'autodocs', 'autodocs'];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  docs: {
    source: {
      type: 'code',
    },
  },
  options: {
    storySort: {
      order: ['Introduction', 'Components', 'Hooks', 'Utils', 'Examples'],
    },
  },
};

export default {
  decorators: decorators,
  parameters: {
    ...parameters,
    reactRouter: reactRouterParameters({
      //@ts-ignore
      initialEntries: router, // replace with your desired initial paths
      initialIndex: 0, // replace with your desired initial index
    }),
  },
  tags: tags,
} satisfies Preview;
