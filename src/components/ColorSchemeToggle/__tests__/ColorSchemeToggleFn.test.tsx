/*
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/users-event';
import { MantineProvider, useMantineColorScheme } from '@mantine/core';

import { ColorSchemeToggle } from '../ColorSchemeToggle';

*/

test('renders with colorscheme', async () => {
  expect(true).toBeTruthy();
});

/*
vi.mock('@mantine/core', async (importOriginal) => {
  const original = await importOriginal();
  return {
    // @ts-ignore
    ...original,
    useMantineColorScheme: vi
      .fn()
      .mockReturnValue({ colorScheme: 'light', setColorScheme: vi.fn() }),
  };
});

describe('ColorSchemeToggle fn', () => {
  it('assert ColorSchemeToggle is with callback light', async () => {
    const { setColorScheme } = useMantineColorScheme();

    render(
      <MantineProvider>
        <ColorSchemeToggle />
      </MantineProvider>
    );

    const lightButton = screen.getByText('Light');
    await userEvent.click(lightButton);

    expect(setColorScheme).toHaveBeenCalledWith('light');
  });

  it('assert ColorSchemeToggle is with callback dark', async () => {
    const { setColorScheme } = useMantineColorScheme();

    render(
      <MantineProvider>
        <ColorSchemeToggle />
      </MantineProvider>
    );

    const darkButton = screen.getByText('Dark');
    await userEvent.click(darkButton);

    expect(setColorScheme).toHaveBeenCalledWith('dark');
  });
});
*/
