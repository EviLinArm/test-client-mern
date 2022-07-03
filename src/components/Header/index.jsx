import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/user';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const onLogoutClick = () => {
        if (window.confirm('Are you sure?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>MERN APP</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/account">
                                    <Button variant="contained">Change profile</Button>
                                </Link>
                                <Link to="/people">
                                    <Button variant="contained" color="info">Find new friends</Button>
                                </Link>
                                <Button onClick={onLogoutClick} variant="contained" color="error">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/registration">
                                    <Button variant="contained">Create account</Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outlined">Login</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};