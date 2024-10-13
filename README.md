# HACKUTA 6 Project

# Stock Analyzer Web App

## Overview

The **Stock Analyzer Web App** is a simple, intuitive tool designed to help users track and analyze stocks using data from the Polygon.io API. Users can search for stocks, add them to a personalized list, and view detailed stock information, including charts, financial analysis and technical analysis indicators.

## Features

- **Stock Search**: Search for stocks by ticker symbol or company name.
- **Stock List**: Add stocks to a customizable list and view basic information (symbol, price, daily change, etc.).
- **Stock Details**: Click on a stock in the list to view detailed information, including charts and technical indicators (e.g., moving averages, RSI).
- **Session Management**: Store the list of selected stocks using session cookies, which persist while the tab is open and are automatically cleared when the session ends.
- **Real-time Data**: Option to fetch live or delayed stock data (depending on API plan).

## Sample Ticker Symbols

- **AAPL** – Apple Inc.
- **MSFT** – Microsoft Corporation
- **GOOGL** – Alphabet Inc. (Google)
- **AMZN** – Amazon.com Inc.
- **TSLA** – Tesla, Inc.
- **NFLX** – Netflix, Inc.
- **META** – Meta Platforms, Inc. (Facebook)
- **NVDA** – NVIDIA Corporation

## Tech Stack

- **Frontend**: React.js, Axios for API requests, React Bootstrap for UI components, and Chart.js (or Recharts) for displaying graphs.
- **API**: Polygon.io Stock API. API Request limit: 5 requests per minute (free tier). Retrieves end-of-day stock data.
- **State Management**: React's useState and useEffect hooks for managing UI state.
- **Session Management**: Session cookies are used to store the user's stock list. This ensures the data remains intact during the session and is cleared when the browser or tab is closed.
- **Environment Variables**: The .env file is used for securely storing sensitive data like API keys.


## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stock-analyzer-webapp.git
cd stock-analyzer-webapp

