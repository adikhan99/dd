import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import { AuthCredentialTypes } from '@ts-types/generated'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const initialState: AuthCredentialTypes = {
  user: null, token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthCredentials(state: AuthCredentialTypes, action: PayloadAction<AuthCredentialTypes>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    removeAuthCredentials(state: AuthCredentialTypes) {
      state.token = null;
      state.user = null;
    }
  }
})

export const useAuthCredentials = () => {
  const dispatch = useDispatch();
  const authValues: AuthCredentialTypes = useSelector((state: RootState) => state.auth);

  const setCredentials = ({ user, token }: AuthCredentialTypes) => {
    dispatch(setAuthCredentials({ token: token, user }));
  }

  const removeCredentials = () => {
    dispatch(removeAuthCredentials());
  }

  return { setCredentials, removeCredentials, authValues }
}

export const { setAuthCredentials, removeAuthCredentials } = authSlice.actions
export default authSlice.reducer
