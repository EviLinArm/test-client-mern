import React, {useEffect} from 'react';
import {fetchAuth, selectIsAuth} from '../../redux/slices/user';
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from "../Registration/Registration.module.scss";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export const Home = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);

    useEffect(() => {
        dispatch(fetchAuth());
    }, []);

    const getAge = (dobDate) => {
        const cur = new Date();
        const diff = cur-Date.parse(dobDate);
        return Math.floor(diff/31557600000);
    }

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/login" />;
    }

    return (
            <Paper classes={{ root: styles.root }}>
                {
                    userData
                    ?
                        <div>
                            <Typography classes={{ root: styles.title }} variant="h5">
                                {userData.name} it's you!
                            </Typography>
                            <div className={styles.photo}>
                                <div className={styles.avatar}>
                                    <Avatar sx={{ width: 100, height: 100 }} src={`http://localhost:4004${userData.userPhoto.userPhoto}`}/>
                                </div>
                            </div>
                            <TextField
                                className={styles.field}
                                label="Name"
                                fullWidth
                                value={userData.name}
                                disabled={true}
                            />
                            <TextField
                                className={styles.field}
                                label="Email"
                                fullWidth
                                value={userData.email}
                                disabled={true}
                            />
                            <TextField
                                className={styles.field}
                                label="Age"
                                fullWidth
                                value={getAge(userData.dob.date)}
                                disabled={true}
                            />
                            <TextField
                                className={styles.field}
                                label="Sex"
                                fullWidth
                                value={userData.sex}
                                disabled={true}
                            />
                            <Link className={styles.link} to="/people">
                                <Button
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    color="info"
                                    fullWidth
                                >
                                    Look at other users
                                </Button>
                            </Link>
                            <Link to="/account">
                                <Button
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                >
                                    Change your profile
                                </Button>
                            </Link>
                        </div>
                    :
                        <div>Loading....</div>
                }
            </Paper>
    );
};