import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/api';

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/register', params);
    return data;
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const { data } = await axios.post('/login', params);
    return data;
});

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
    const { data } = await axios.get('/auth');
    return data;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (params) => {
    const { data } = await axios.patch('/user', params);
    return data;
});

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
    const { data } = await axios.get('/users');
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
    users: {
        items: [],
        status: 'loading',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {

        // fetchRegister

        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // fetchLogin

        [fetchLogin.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchLogin.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // fetchAuth

        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // fetchUser

        [fetchUser.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUser.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // fetchUsers

        [fetchUsers.pending]: (state) => {
            state.users.status = 'loading';
            state.users.items = null;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users.status = 'loaded';
            state.users.items = action.payload;
        },
        [fetchUsers.rejected]: (state) => {
            state.users.status = 'error';
            state.users.items = null;
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.user.data);

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;