import React from 'react';
import {Route, Routes} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {fetchAuth, selectIsAuth} from "./redux/slices/user";

import Container from "@mui/material/Container";
import {Header} from "./components/Header";
import {Registration} from "./pages/Registration";
import {Login} from "./pages/Login";
import {Home} from "./pages/Home";
import {Account} from "./pages/Account";
import {People} from "./pages/People";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        dispatch(fetchAuth());
    }, []);

    return (
      <>
        <Header />
        <Container maxWidth="lg">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/people" element={<People/>}/>
            </Routes>
        </Container>
      </>
  );
}

export default App;