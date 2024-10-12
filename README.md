# HACKUTA 6 Project

# Stock Analyzer Web App

## Overview

The **Stock Analyzer Web App** is a simple, intuitive tool designed to help users track and analyze stocks using data from the Polygon.io API. Users can search for stocks, add them to a personalized list, and view detailed stock information, including charts and technical analysis indicators. This project is built using React.js for the frontend and leverages environment variables to securely access the Polygon API.

## Features

- **Stock Search**: Search for stocks by ticker symbol or company name.
- **Stock List**: Add stocks to a customizable list and view basic information (symbol, price, daily change, etc.).
- **Stock Details**: Click on a stock in the list to view detailed information, including charts and technical indicators (e.g., moving averages, RSI).
- **Real-time Data**: Option to fetch live or delayed stock data (depending on API plan).
  
## Tech Stack

- React.js, Axios, Chart.js (or Recharts) for graphs.
- API: [Polygon.io Stock API](https://polygon.io/).
- Environment Variables: `.env` file for securely storing API keys.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stock-analyzer-webapp.git
cd stock-analyzer-webapp

