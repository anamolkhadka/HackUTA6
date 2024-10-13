import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { db } from './firebase'; // Import Firestore setup
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import '../styles/App.css';

const formatToUSD = (value) => {
    return value ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) : 'N/A';
};

// Helper function to get last trading date
const getLastTradingDate = () => {
    const today = new Date();
    let lastTradingDate = new Date(today);
  
    // If today is Saturday, use Friday
    if (today.getDay() === 6) {
      lastTradingDate.setDate(today.getDate() - 1);
    }
    // If today is Sunday, use Friday
    else if (today.getDay() === 0) {
      lastTradingDate.setDate(today.getDate() - 2);
    }
    // Otherwise, use the previous business day if today is Monday
    else if (today.getDay() === 1) {
      lastTradingDate.setDate(today.getDate() - 3);
    } else {
      lastTradingDate.setDate(today.getDate() - 1); // Previous business day
    }
  
    // Format the date as YYYY-MM-DD
    return lastTradingDate.toISOString().split('T')[0];
};

const StockDetails = () => {
    const { ticker } = useParams();
    const [key, setKey] = useState('open-close'); // Track active tab
    const [companyData, setCompanyData] = useState({});
    const [loading, setLoading] = useState({ 
        openClose: true,
        balanceSheet: false,
        cashFlow: false,
        incomeStatement: false,
        dividends: false
    });

    // Fetch Last Close data for the selected data.
    const fetchOpenCloseData = async () => {
        const lastTradingDate = getLastTradingDate(); // Get the last trading date

        try {
            const response = await axios.get(`https://api.polygon.io/v1/open-close/${ticker}/${lastTradingDate}`, {
                params: { adjusted: true, apiKey: process.env.REACT_APP_POLYGON_API_KEY }
            });
            const openCloseData = response.data;
            if (openCloseData) {
                setCompanyData((prevData) => ({ ...prevData, openClose: openCloseData }));
            } else {
                console.error('No results for open/close data.');
            }

        } catch (error) {
            console.error("Error fetching open/close data:", error);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, openClose: false }));
        }
    };

    // Fetch Balance Sheet data
    const fetchBalanceSheetData = async () => {
        try {
            const response = await axios.get(`https://api.polygon.io/vX/reference/financials`, {
                params: { ticker, limit: 1, apiKey: process.env.REACT_APP_POLYGON_API_KEY }
            });
            const financialData = response.data.results[0];
            const endDate = financialData.end_date;  // Extract end_date from financial data
            setCompanyData((prevData) => ({
                ...prevData, 
                balance_sheet: financialData.financials.balance_sheet, 
                end_date: endDate
            }));
            //await saveFirestoreData('balance_sheet',{ ...balanceSheet, endDate});
        } catch (error) {
            console.error("Error fetching balance sheet data:", error);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, balanceSheet: false }));
        }
    };

    // Fetch Cash Flow data
    const fetchCashFlowData = async () => {
        try {
            const response = await axios.get(`https://api.polygon.io/vX/reference/financials`, {
                params: { ticker, limit: 1, apiKey: process.env.REACT_APP_POLYGON_API_KEY }
            });
            const financialData = response.data.results[0];
            const endDate = financialData.end_date;  // Extract end_date from financial data
            setCompanyData((prevData) => ({
                ...prevData, 
                cash_flow_statement: financialData.financials.cash_flow_statement,
                end_date: endDate
            }));
            ///await saveFirestoreData('cash_flow_statement', {...financialData.financials.cash_flow_statement, end_date: endDate});
        } catch (error) {
            console.error("Error fetching cash flow data:", error);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, cashFlow: false }));
        }
    };

    // Fetch Income Statement data
    const fetchIncomeStatementData = async () => {
        try {
            const response = await axios.get(`https://api.polygon.io/vX/reference/financials`, {
                params: { ticker, limit: 1, apiKey: process.env.REACT_APP_POLYGON_API_KEY }
            });
            const financialData = response.data.results[0];
            const endDate = financialData.end_date;  // Extract end_date from financial data
            setCompanyData((prevData) => ({
                ...prevData, 
                income_statement: financialData.financials.income_statement,
                end_date: endDate
            }));
            ///await saveFirestoreData('income_statement', { ...financialData.financials.income_statement, end_date: endDate });
        } catch (error) {
            console.error("Error fetching income statement data:", error);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, incomeStatement: false }));
        }
    };

    // Fetch data for Dividends
    const fetchDividendsData = async () => {
        try {
            const response = await axios.get(`https://api.polygon.io/v3/reference/dividends`, {
                params: { ticker, limit: 10, apiKey: process.env.REACT_APP_POLYGON_API_KEY }
            });
            setCompanyData((prevData) => ({ ...prevData, dividends: response.data.results }));
            ///await saveFirestoreData('dividends', response.data.results);
        } catch (error) {
            console.error("Error fetching dividends data:", error);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, dividends: false }));
        }
    };

    // Trigger API call based on selected tab
    useEffect(() => {
        if (key === 'open-close' && !companyData.openClose) {
            fetchOpenCloseData();
        }
        if (key === 'balanceSheet' && !companyData.balance_sheet) {
            fetchBalanceSheetData();
        }
        if (key === 'cashFlow' && !companyData.cash_flow_statement) {
            fetchCashFlowData();
        }
        if (key === 'incomeStatement' && !companyData.income_statement) {
            fetchIncomeStatementData();
        }
        if (key === 'dividends' && !companyData.dividends) {
            fetchDividendsData();
        }
    }, [key]);

    return (
    <div>
        <h1 className='custom'>{ticker}</h1>
        <Tabs
            id="stock-details-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 custom-tabs"
            >

            {/* Tab for Last Close */}
            <Tab eventKey="open-close" title="Last Close">
                {loading.openClose ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Ticker Symbol</td><td>{companyData.openClose?.symbol || "N/A"}</td></tr>
                            <tr><td>Date</td><td>{companyData.openClose?.from || "N/A"}</td></tr>
                            <tr><td>Open</td><td>{formatToUSD(companyData.openClose?.open) || "N/A"}</td></tr>
                            <tr><td>Close</td><td>{formatToUSD(companyData.openClose?.close) || "N/A"}</td></tr>
                            <tr><td>High</td><td>{formatToUSD(companyData.openClose?.high) || "N/A"}</td></tr>
                            <tr><td>Low</td><td>{formatToUSD(companyData.openClose?.low) || "N/A"}</td></tr>
                            <tr><td>Volume</td><td>{companyData.openClose?.volume ? companyData.openClose.volume.toLocaleString() : 'N/A'}</td></tr>
                        </tbody>
                    </Table>
                )}
            </Tab>


            {/* Tab for Balance Sheet */}
            <Tab eventKey="balanceSheet" title="Balance Sheet">
            {loading.balanceSheet ? (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Fiscal Year Ending</td><td>{companyData.end_date || "N/A"}</td></tr>
                        <tr><td>Assets</td><td>{formatToUSD(companyData.balance_sheet?.assets?.value) || "N/A"}</td></tr>
                        <tr><td>Current Assets</td><td>{formatToUSD(companyData.balance_sheet?.current_assets?.value) || "N/A"}</td></tr>
                        <tr><td>Liabilities</td><td>{formatToUSD(companyData.balance_sheet?.liabilities?.value) || "N/A"}</td></tr>
                        <tr><td>Equity</td><td>{formatToUSD(companyData.balance_sheet?.equity?.value) || "N/A"}</td></tr>
                        <tr><td>Noncurrent Assets</td><td>{formatToUSD(companyData.balance_sheet?.noncurrent_assets?.value) || "N/A"}</td></tr>
                    </tbody>
                </Table>
            )}
            </Tab>

            {/* Tab for Cash Flow */}
            <Tab eventKey="cashFlow" title="Cash Flow">
                {loading.cashFlow ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr><td>Fiscal Year Ending</td><td>{companyData.end_date || "N/A"}</td></tr>
                        <tr><td>Net Cash Flow</td><td>{formatToUSD(companyData.cash_flow_statement?.net_cash_flow?.value) || "N/A"}</td></tr>
                        <tr><td>Operating Activities</td><td>{formatToUSD(companyData.cash_flow_statement?.net_cash_flow_from_operating_activities?.value) || "N/A"}</td></tr>
                        <tr><td>Investing Activities</td><td>{formatToUSD(companyData.cash_flow_statement?.net_cash_flow_from_investing_activities?.value) || "N/A"}</td></tr>
                        <tr><td>Financing Activities</td><td>{formatToUSD(companyData.cash_flow_statement?.net_cash_flow_from_financing_activities?.value) || "N/A"}</td></tr>
                    </tbody>
                </Table>
                )}
            </Tab>

            {/* Tab for Income Statement */}
            <Tab eventKey="incomeStatement" title="Income Statement">
                {loading.incomeStatement ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr><td>Fiscal Year Ending</td><td>{companyData.end_date || "N/A"}</td></tr>
                        <tr><td>Revenues</td><td>{formatToUSD(companyData.income_statement?.revenues?.value) || "N/A"}</td></tr>
                        <tr><td>Gross Profit</td><td>{formatToUSD(companyData.income_statement?.gross_profit?.value) || "N/A"}</td></tr>
                        <tr><td>Net Income</td><td>{formatToUSD(companyData.income_statement?.net_income_loss?.value) || "N/A"}</td></tr>
                        <tr><td>Operating Income</td><td>{formatToUSD(companyData.income_statement?.operating_income_loss?.value) || "N/A"}</td></tr>
                    </tbody>
                </Table>
                )}
            </Tab>
            
            {/* Tab for Dividends */}
            <Tab eventKey="dividends" title="Dividends">
                {loading.dividends ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyData.dividends && companyData.dividends.length > 0 ? (
                            companyData.dividends.map((dividend, index) => (
                                <React.Fragment key={index}>
                                    <tr><td>Ticker Symbol</td><td>{dividend.ticker}</td></tr>
                                    <tr><td>Cash Amount</td><td>{formatToUSD(dividend.cash_amount)}</td></tr>
                                    <tr><td>Ex-Dividend Date</td><td>{dividend.ex_dividend_date}</td></tr>
                                    <tr><td>Pay Date</td><td>{dividend.pay_date}</td></tr>
                                    <tr><td>Record Date</td><td>{dividend.record_date}</td></tr>
                                    <tr><td>Dividend Type</td><td>{dividend.dividend_type}</td></tr>
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center" }}>No dividends available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                )}
            </Tab>
        </Tabs>
    </div>
    );
};

export default StockDetails;
