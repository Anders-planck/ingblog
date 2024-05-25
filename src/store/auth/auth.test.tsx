import {
  reducer,
  selectProfile,
  selectUser,
  setSession,
  selectLoginAttempted,
  setLoginAttempted,
  selectIsAuthenticated,
  setProfile,
  setUser,
  AuthState,
} from '@/store/auth';

const user = {
  id: '',
  app_metadata: {},
  user_metadata: {},
  aud: '',
  created_at: '',
};

const session = {
  access_token: 'access_token',
  expires_in: 3600,
  refresh_token: 'refresh_token',
  token_type: 'bearer',
  user: {
    id: '',
    app_metadata: {},
    user_metadata: {},
    aud: '',
    created_at: '',
  },
};

const profile = {
  phone: '187587656757',
  full_name: 'Test User',
  work: 'Developer',
  updated_at: new Date(),
};

describe('Auth Store', () => {
  let state: AuthState;

  beforeEach(() => {
    state = {
      user: null,
      profile: null,
      session: null,
      loginAttempted: false,
    };
  });

  test('setUser action', () => {
    const action = setUser(user);
    const newState = reducer(state, action);
    expect(newState.user).toEqual(user);
  });

  test('setProfile action', () => {
    const action = setProfile(profile);
    const newState = reducer(state, action);
    expect(newState.profile).toEqual(profile);
  });

  test('setSession action', () => {
    const action = setSession(session);
    const newState = reducer(state, action);
    expect(newState.session).toEqual(session);
  });

  test('setLoginAttempted action', () => {
    const action = setLoginAttempted(true);
    const newState = reducer(state, action);
    expect(newState.loginAttempted).toBe(true);
  });

  test('selectUser selector', () => {
    state.user = user;
    // @ts-ignore
    const selectedUser = selectUser({
      auth: state,
    });
    expect(selectedUser).toEqual(user);
  });

  test('selectProfile selector', () => {
    state.profile = profile;
    // @ts-ignore
    const selectedProfile = selectProfile({
      auth: state,
    });
    expect(selectedProfile).toEqual(profile);
  });

  test('selectLoginAttempted selector', () => {
    state.loginAttempted = true;
    // @ts-ignore
    const selectedLoginAttempted = selectLoginAttempted({
      auth: state,
    });
    expect(selectedLoginAttempted).toBe(true);
  });

  test('selectIsAuthenticated selector', () => {
    state.user = user;
    state.session = session;
    // @ts-ignore
    const selectedIsAuthenticated = selectIsAuthenticated({
      auth: state,
    });
    expect(selectedIsAuthenticated).toBe(true);
  });
});
