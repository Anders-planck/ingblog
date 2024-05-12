import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { HomePage } from '@/pages/Home.page';
import store from '@/store';

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    // @ts-ignore
    ...original,
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
  };
});

describe('Home Page', () => {
  it('renders with layout', async () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <HomePage />
        </MantineProvider>
      </Provider>
    );

    // Check for elements from the layout
    const element = screen.getByText(/ingBlog/i);
    expect(element).toBeInTheDocument();
  });
});
