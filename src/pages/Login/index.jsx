import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import {fetchLogin, selectIsAuth} from '../../redux/slices/user';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchLogin(values));
        if (!data.payload) {
            return alert('Wrong email or password!');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Enter your data
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    type="email"
                    {...register('email', { required: 'Enter your email' })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Enter your password' })}
                    fullWidth
                />
                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Login
                </Button>
                <Link className={styles.nav} to="/registration">
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="info"
                        fullWidth
                    >
                        Click to register
                    </Button>
                </Link>
            </form>
        </Paper>
    );
};