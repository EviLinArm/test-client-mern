import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {fetchAuth, fetchUsers, selectIsAuth} from "../../redux/slices/user";

import styles from './People.module.scss'
import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export const People = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);
    const usersData = useSelector((state) => state.user.users.items);
    let filterUsers;

    useEffect(() => {
        dispatch(fetchAuth());
        dispatch(fetchUsers());
    }, []);

    if (userData && usersData) {
        filterUsers = (usersData.filter(e => e._id !== userData._id));
    }

    const getAge = (dobDate) => {
        const cur = new Date();
        const diff = cur-Date.parse(dobDate);
        return Math.floor(diff/31557600000);
    }

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {
                filterUsers
                    ?
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {filterUsers.map((item) => (
                                    <Grid item xs={2} sm={4} md={4} key={item._id}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                {
                                                    item.userPhoto.userPhoto
                                                        ?
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={`http://localhost:4004${item.userPhoto.userPhoto}`}
                                                            alt={item.name}
                                                        />
                                                        :
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="http://localhost:4004/uploads/guys.jpg"
                                                            alt={item.name}
                                                        />
                                                }
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Age: {getAge(item.dob.date)}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Link className={styles.link} to="/">
                                <Button
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    color="info"
                                    fullWidth
                                >
                                    Back to your Profile
                                </Button>
                            </Link>
                        </Box>
                    :
                        <div>Loading...</div>
            }
        </div>
    );
};