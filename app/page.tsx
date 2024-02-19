import React from 'react';
import './globals.css';

export default function Page() {
    return (
        <div className="container">
            <div className="sidebar">
            <div className="main">
                <p>Dashboard Tricount</p>
            </div>
                <ul>
                    <li><a href="#">Tricount 1</a></li>
                    <li><a href="#">Tricount 2</a></li>
                    <li><a href="#">Tricount 3</a></li>
                    <li><a href="#">Tricount 4</a></li>  
                </ul>
            </div>
        </div>
    );
}