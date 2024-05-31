import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { reducer as searchReducer } from './app/search';
import { listenerMiddleware } from './listener';
import { reducer as authReducer } from './auth';
import { postApi } from '@/services/posts';
import { usersApi } from '@/services/users';

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  [postApi.reducerPath]: postApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        listenerMiddleware.middleware,
        postApi.middleware,
        usersApi.middleware
      ),
  });

export type AppStore = ReturnType<typeof setupStore>;

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares().concat(
        listenerMiddleware.middleware,
        postApi.middleware,
        usersApi.middleware
      ),
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
