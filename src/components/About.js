import React from "react";
import '../styles/About.css'; // Create this CSS file for custom styles

function About(){
    return(
        <div className="about-container">
            <h2>About Stock Analyzer Web App</h2>
            <p>
                The <strong>Stock Analyzer Web App</strong> is an intuitive tool designed to help users track and analyze stocks 
                using real-time data from the Polygon.io API. Whether you're a seasoned investor or just curious about the stock market, 
                this app provides a seamless experience for monitoring stock performance.
            </p>
    
            <h2>Key Features</h2>
            <ul>
                <li><strong>Stock Search:</strong> Quickly search for stocks by ticker symbol or company name.</li>
                <li><strong>Stock List:</strong> Customize your own stock list and view essential stock data such as daily changes, symbol, and price.</li>
                <li><strong>Stock Details:</strong> Dive deep into stock data, including charts, technical indicators like moving averages, RSI, and more.</li>
                <li><strong>Firebase Integration:</strong> Your stock list is saved and persisted across sessions using Firebase Firestore, ensuring real-time data retrieval.</li>
                <li><strong>Real-time Data:</strong> Fetch live or delayed stock data depending on your API plan with Polygon.io.</li>
            </ul>
    
            <h2>Supported Stock Symbols</h2>
            <p> Here are some popular stock symbols you can explore </p>
            <ul>
                <li>AAPL – Apple Inc.</li>
                <li>MSFT – Microsoft Corporation</li>
                <li>GOOGL – Alphabet Inc. (Google)</li>
                <li>AMZN – Amazon.com Inc.</li>
                <li>TSLA – Tesla, Inc.</li>
                <li>NFLX – Netflix, Inc.</li>
                <li>META – Meta Platforms, Inc. (Facebook)</li>
                <li>NVDA – NVIDIA Corporation</li>
            </ul>

            <h2>Note</h2>
            <p> The API request limit is 5 per minute (free tier) and could affect the perfomance. </p>
            <p> Explore the app and start building your own stock watchlist today ! </p>

        </div>
    );
}
export default About;