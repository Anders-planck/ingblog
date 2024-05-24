import { vi } from 'vitest';
import { setupStore } from '@/store/index';
import { renderWithProviders } from '@/tests/utils';
import { HomePage } from '@/pages/Home.page';
import { setSearch } from '@/store/app/search';

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    // @ts-ignore
    ...original,
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
  };
});

test('Sets up initial state state with actions', () => {
  const store = setupStore();
  store.dispatch(setSearch('Buy milk'));

  renderWithProviders(<HomePage />, { store });
});
