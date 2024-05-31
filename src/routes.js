import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from './pages/Main';
import Repositorio from './pages/Repositorio';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Main} />
                <Route exact path="/repositorio/:repositorio" Component={Repositorio} />
            </Routes>
        </BrowserRouter>
    )
}