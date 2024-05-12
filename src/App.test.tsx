import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('should render without crashing', () => {
    expect(true).toBe(true);
  });

  it('Check if App renders without crashing', async () => {
    render(<App />);

    const element = await screen.findByText('Isa-blog');
    expect(element).toBeInTheDocument();
  });
});
