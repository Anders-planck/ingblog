import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { reducer as searchReducer } from './app/search';
import { listenerMiddleware } from './listener';
import { reducer as authReducer } from './auth';

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
    },
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares().concat(listenerMiddleware.middleware),
  });

const store = makeStore();
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
