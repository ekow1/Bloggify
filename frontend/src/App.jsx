import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage.jsx';
import Home from './components/Home.jsx';
import { useAuthContext } from './hook/useAuthContext.js';
import Navbar from "./components/Navbar.jsx";
import './index.css';
import BlogPage from "./components/BlogPage.jsx";

function App() {
    const { user } = useAuthContext();

    console.log('User in App:', user); // Log user state

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={ <Home />}
                />

                <Route
                    path="/auth"
                    element={!user ? <AuthPage /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
