import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle';

describe('ColorSchemeToggle render', () => {
  it('renders without crashing', () => {
    render(
      <MantineProvider>
        <ColorSchemeToggle />
      </MantineProvider>
    );

    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });
});

describe('ColorSchemeToggle usage', () => {
  it('changes the color scheme when the Light is clicked', async () => {
    render(
      <MantineProvider>
        <ColorSchemeToggle />
      </MantineProvider>
    );

    // get Tag <html> to check the colo
    const lightButton = screen.getByText('Light');

    // Simulate a click on the Light button
    userEvent.click(lightButton);

    await waitFor(() => {
      expect(document.querySelector('html')).toHaveAttribute('data-mantine-color-scheme', 'light');
    });
  });

  it('changes the color scheme when the Dark is clicked', async () => {
    render(
      <MantineProvider>
        <ColorSchemeToggle />
      </MantineProvider>
    );

    const darkButton = screen.getByText('Dark');

    userEvent.click(darkButton);

    await waitFor(() => {
      expect(document.querySelector('html')).toHaveAttribute('data-mantine-color-scheme', 'dark');
    });
  });
});
