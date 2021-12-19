import React, {useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';

export default function Navigation() {

    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
            </Routes>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
            </Routes>
            </Router>
    )
}
