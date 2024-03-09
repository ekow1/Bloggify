import React from 'react';
import ReactDOM from 'react-dom/client';


import { AuthProvider } from './context/authContext.jsx';
import {BlogContextProvider} from "./context/blogContext.jsx";

import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <BlogContextProvider>
            <App />
            </BlogContextProvider>
        </AuthProvider>
    </React.StrictMode>
);
