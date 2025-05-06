import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService'; 


export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    const response = await authService.login(credentials);
    return response.data; 
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const initialState = {
  user: authService.getCurrentUser(),      
  token: localStorage.getItem('token'),    
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
