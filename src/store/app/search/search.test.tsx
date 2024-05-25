import {
  setSearch,
  closeSearchModal,
  openSearchModal,
  reducer,
  SearchState,
} from '@/store/app/search';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual({
    search: '',
    opened: false,
  });
});

test('should handle setSearch', () => {
  expect(
    reducer(
      {
        search: '',
        opened: false,
      },
      {
        type: 'search/setSearch',
        payload: 'test',
      }
    )
  ).toEqual({
    search: 'test',
    opened: false,
  });
});

test('should handle openSearchModal', () => {
  expect(
    reducer(
      {
        search: '',
        opened: false,
      },
      {
        type: 'search/openSearchModal',
      }
    )
  ).toEqual({
    search: '',
    opened: true,
  });
});

test('should handle closeSearchModal', () => {
  expect(
    reducer(
      {
        search: '',
        opened: true,
      },
      {
        type: 'search/closeSearchModal',
      }
    )
  ).toEqual({
    search: '',
    opened: false,
  });
});

test('should handle unknown action type', () => {
  expect(
    reducer(
      {
        search: '',
        opened: false,
      },
      {
        type: 'unknown',
      }
    )
  ).toEqual({
    search: '',
    opened: false,
  });
});

test('should handle the values on setSearch', () => {
  const previousState: SearchState = {
    search: '',
    opened: false,
  };

  expect(reducer(previousState, setSearch('Run the tests'))).toEqual({
    search: 'Run the tests',
    opened: false,
  });
});

test('should handle opened', () => {
  const previousState: SearchState = {
    search: 'Run the tests',
    opened: false,
  };

  expect(reducer(previousState, openSearchModal())).toEqual({
    search: 'Run the tests',
    opened: true,
  });
});

test('should handle closeSearchModal', () => {
  const previousState: SearchState = {
    search: 'Run the tests',
    opened: true,
  };

  expect(reducer(previousState, closeSearchModal())).toEqual({
    search: 'Run the tests',
    opened: false,
  });
});
