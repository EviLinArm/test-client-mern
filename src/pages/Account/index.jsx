import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchUser, selectIsAuth} from "../../redux/slices/user";
import {useForm} from "react-hook-form";
import axios from "../../utils/api";

import styles from "../Registration/Registration.module.scss";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {FormHelperText} from "@mui/material";
import TextField from "@mui/material/TextField";

export const Account = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);

    const [userPhoto, setUserPhoto] = React.useState('');
    const inputPhotoRef = React.useRef(null);

    useEffect(() => {
        dispatch(fetchAuth());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onTouched',
    });

    const onSubmit = async (values) => {

        let outputs = {};

        if (values.name.length !== 0) {
            outputs = {
                ...outputs,
                name: values.name
            }
        }

        if (values.password.length !== 0) {
            outputs = {
                ...outputs,
                password: values.password
            }
        }

        if (userPhoto.length !== 0) {
            outputs = {
                ...outputs,
                userPhoto: {userPhoto}
            }
        }

        if (Object.keys(outputs).length === 0 && outputs.constructor === Object) {
            return alert('Error - please enter some data!');
        }

        const data = await dispatch(fetchUser(outputs));
        if (!data.payload) {
            return alert('Data change - Error!');
        }
        return alert('Data change - Success!');

    };

    const onClickRemovePhoto = () => {
        setUserPhoto('');
    };

    const handleUploadPhoto = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/uploads', formData);
            setUserPhoto(data.url);
        } catch (err) {
            console.warn(err);
            alert('User photo upload error!');
        }
    };

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/login" />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            {
                userData
                    ?
                        <>
                            <Typography classes={{ root: styles.title }} variant="h5">
                                Change your profile
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {userPhoto
                                    ?
                                    <div className={styles.photo}>
                                        <div className={styles.avatar}>
                                            <Avatar sx={{ width: 100, height: 100 }} src={`http://localhost:4004${userPhoto}`}/>
                                        </div>
                                        <Button variant="contained" color="error" onClick={onClickRemovePhoto}>
                                            Delete photo
                                        </Button>
                                    </div>
                                    :
                                    <div className={styles.photo}>
                                        <div className={styles.avatar}>
                                            <Avatar className={styles.pointer} sx={{ width: 100, height: 100 }} onClick={() => inputPhotoRef.current.click()}/>
                                        </div>
                                        <FormHelperText>Please, CLICK on photo to upload it!</FormHelperText>
                                    </div>
                                }
                                <input ref={inputPhotoRef} type="file" onChange={handleUploadPhoto} hidden />

                                <TextField
                                    error={Boolean(errors.name?.message)}
                                    helperText={errors.name?.message}
                                    type="text"
                                    {...register('name')}
                                    className={styles.field}
                                    label="Your name"
                                    fullWidth
                                />

                                <TextField
                                    error={Boolean(errors.password?.message)}
                                    helperText={errors.password?.message}
                                    type="password"
                                    {...register('password')}
                                    className={styles.field}
                                    label="Password"
                                    fullWidth
                                />

                                <Button
                                    disabled={!isValid}
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                >
                                    Change data
                                </Button>
                            </form>
                        </>
                    :
                            <div>Loading....</div>
            }
        </Paper>
    );
};