import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../utils/api';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack} from "@mui/material";

import styles from './Registration.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/user';


export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date('2005-07-01'));
    const [sex, setSex] = React.useState('');
    const [userPhoto, setUserPhoto] = React.useState('');
    const inputPhotoRef = React.useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onTouched',
    });

    const onSubmit = async (values) => {
        const outputs = {
            ...values,
            dob: {date},
            userPhoto: {userPhoto}
        }
        const data = await dispatch(fetchRegister(outputs));

        if (!data.payload) {
            return alert('Registration error!');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    const handleChangeData = (newDate) => {
        setDate(newDate);
    };
    const handleChangeSex = (event) => {
        setSex(event.target.value);
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
    const onClickRemovePhoto = () => {
        setUserPhoto('');
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Create your profile
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
                            <FormHelperText>Please, click on photo, to upload it</FormHelperText>
                        </div>
                }
                <input ref={inputPhotoRef} type="file" onChange={handleUploadPhoto} hidden />

                <TextField
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    type="text"
                    {...register('name', { required: 'Enter your name!' })}
                    className={styles.field}
                    label="Your name"
                    fullWidth
                />

                <TextField
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    type="email"
                    {...register('email', { required: 'Enter your email!' })}
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                />

                <TextField
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    type="password"
                    {...register('password', { required: 'Enter your password!' })}
                    className={styles.field}
                    label="Password"
                    fullWidth
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3} className={styles.field}>
                        <DesktopDatePicker
                            label="Date of birth"
                            inputFormat="dd.MM.yyyy"
                            value={date}
                            onChange={handleChangeData}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

                <FormControl className={styles.field}>
                    <InputLabel id="sex-label">Sex</InputLabel>
                    <Select
                        error={Boolean(errors.sex?.message)}
                        type="text"
                        {...register('sex', { required: 'Enter your sex!' })}
                        labelId="sex-label"
                        value={sex}
                        onChange={handleChangeSex}
                        label="Sex"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Register
                </Button>
                <Link className={styles.nav} to="/login">
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="info"
                        fullWidth
                    >
                        Click to login
                    </Button>
                </Link>
            </form>
        </Paper>
    );
};