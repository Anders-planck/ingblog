import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { HomePage } from '@/pages/Home.page';
import { renderWithProviders } from '@/tests/utils';

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    // @ts-ignore
    ...original,
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
  };
});

describe('Home Page', async () => {
  it('renders with layout', async () => {
    renderWithProviders(<HomePage />);

    // Check for elements from the layout
    const element = screen.getByText(/Posts/i);
    expect(element).toBeInTheDocument();
  });

  // check for the posts
  it('renders List posts', async () => {
    renderWithProviders(<HomePage />);

    // Check for the posts list element id = posts-list
    const element = document.getElementById('posts-list');
    expect(element).toBeInTheDocument();

    // check the length of the posts > 1
    expect(element?.children.length).toBeGreaterThan(1);
  });
});
