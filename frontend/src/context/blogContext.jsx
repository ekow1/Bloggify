// Importing necessary React features and hooks for managing state and context
import React, { createContext, useReducer, useContext, useState } from 'react';

// Creating a context to hold the state and dispatch function for blogs
export const BlogContext = createContext();

// Initial state for the blogs and search results
const initialState = {
    blogs: null,
    searchResults: null, // New state for search results
};

// Reducer function to handle state changes based on different actions
const blogReducer = (state, action) => {
    switch (action.type) {
        // Set blogs action: Replace existing blogs with the new ones
        case 'SET_BLOG':
            return {
                ...state,
                blogs: action.payload,
                searchResults: null, // Reset search results when new blogs are set
            };

        // Add blog action: Append a new blog to the existing blogs array
        case 'ADD_BLOG':
            return {
                ...state,
                blogs: [...state.blogs, action.payload],
            };

        // Update blog action: Update a specific blog in the blogs array
        case 'UPDATE_BLOG':
            return {
                ...state,
                blogs: state.blogs.map(blog =>
                    blog._id === action.payload._id ? { ...blog, ...action.payload } : blog
                ),
            };

        // Delete blog action: Remove a specific blog from the blogs array
        case 'DELETE_BLOG':
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload),
            };

        // Search blog action: Set search results based on the provided payload
        case 'SEARCH_BLOG':
            return {
                ...state, searchResults: action.payload,
            };

        // Default case: Return the current state if the action type is not recognized
        default:
            return state;
    }
};

// Provider component to wrap the application and provide the context and state to its children
export const BlogContextProvider = ({ children }) => {
    // UseReducer hook to manage state changes based on the defined reducer function and initial state
    const [state, dispatch] = useReducer(blogReducer, initialState);

    // Logging the current state to the console for debugging purposes
    console.log(state);

    // Render the context provider with the current state and dispatch function
    return (
        <BlogContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
};


