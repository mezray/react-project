'use client'
import React from 'react';
import HomePage from '../app/pages/HomePage/page'
import TricountForm from './TricountForm'

const Sidebar = () => {
    return (
        <div
            style={{
                flex: "0 0 200px",
                height: "100vh",
                overflow: "auto",
                backgroundColor: "#f5f5f5",
            }}
        >
        
            <HomePage />

        </div>
    );
}

export default Sidebar;