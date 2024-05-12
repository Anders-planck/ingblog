import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';
import { RootState } from '@/store';

interface AuthState {
  user: any | null;
  session: Session | null;
  loginAttempted: boolean;
  profile: {
    full_name: string;
    phone: string;
    work: string;
    updated_at: Date;
  } | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loginAttempted: false,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<null | any>) => {
      state.user = action.payload;
    },
    setSession: (state, action: PayloadAction<null | Session>) => {
      state.session = action.payload;
    },
    setLoginAttempted: (state, action: PayloadAction<boolean>) => {
      state.loginAttempted = action.payload;
    },
    setProfile: (state, action: PayloadAction<null | AuthState['profile']>) => {
      state.profile = action.payload;
    },
  },
});

export const { setUser, setSession, setLoginAttempted, setProfile } = authSlice.actions;

export const { reducer } = authSlice;

export const selectIsAuthenticated = ({ auth }: RootState) => auth.user !== null;

export const selectUser = ({ auth }: RootState) => auth.user;

export const selectSession = ({ auth }: RootState) => auth.session;

export const selectProfile = ({ auth }: RootState) => auth.profile;

export const selectLoginAttempted = ({ auth }: RootState) => auth.loginAttempted;
