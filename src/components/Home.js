import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const API_URL = "https://api.polygon.io/v3/reference/tickers"
const API_KEY = "19T3x8ImOxdXlhCqArDPanS2IIlSBDrG"


function Home({ search, setSearch, companies, addCompany, deleteCompany}){
    console.log(companies);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);  // State to control modal visibility
    const [error, setError] = useState(null);  // State to store any error messages

    // Handle closing the modal
    const handleClose = () => {
        setSearch('');
        setShowModal(false);
    }

    // Handle showing the modal
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        if (search) {
          // Function to make API call using Axios to search for the symbol
          console.log("Search for ticker ", search);
          const fetchCompanyDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/${search}`, {
                    params: {
                        apiKey: API_KEY
                    }
                });
                console.log(response.data);

                if (response.data && response.data.results) {
                    console.log(response.data.results);
                    setCompanyDetails(response.data.results);  // Store company details if found
                    setError(null);
                } else {
                    setCompanyDetails(null);  // Reset if no results
                    setError("Company not found.");
                    console.log("Company not found.");
                }
            } catch (error) {
                console.log("Error fetching company data:", error);
                setCompanyDetails(null);  // Handle error by resetting company details
                setError("Error fetching company data.");
            } finally {
                console.log("Finally executed.");
                handleShow(); // Open the modal after search completes.
            }
          };
    
          fetchCompanyDetails();  // Call the function
        }
    }, [search]);

    /* Function to add the symbol selected to the companies*/
    const handleAddCompany = () => {
        if (companyDetails) {
            addCompany(companyDetails);  //Add the company to the list
            setCompanyDetails(null);  // Clear the company details after adding.
            setSearch('');
            handleClose(); // Close the modal after adding.
        }
    };

    return(
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ticker Symbol</th>
                        <th>Company Name</th>
                        <th>Industry</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Market</th>
                        <th>Market Cap</th>
                        <th>Detail</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{company.ticker}</td>
                                <td>{company.name}</td>
                                <td>{company.sic_description || "N/A"}</td>
                                <td>{company.address ? company.address.city : "N/A"}</td>
                                <td>{company.address ? company.address.state : "N/A"}</td>
                                <td>{company.market || "N/A"}</td>
                                <td>
                                    {company.market_cap
                                    ? `$${company.market_cap.toLocaleString()}`
                                    : 'N/A'}
                                </td>
                                <td>
                                    <Button variant="dark">View</Button>
                                </td>
                                <td>
                                    <Button variant="dark" onClick={ () => deleteCompany(company.ticker)}>
                                        Remove 
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" style={{ textAlign: "center" }}>No companies added yet</td>
                        </tr>
                    )};
                    
                </tbody>
            </Table>

            {/* Modal to display search result or error */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{error ? "Error" : "Company Found"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        companyDetails && (
                            <div>
                                <p>Company: {companyDetails.name}</p>
                                <p>Ticker: {companyDetails.ticker}</p>
                                <p>Market: {companyDetails.market || "N/A"}</p>
                                {/* Add other details if needed */}
                            </div>
                        )
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {error ? (
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                    ) : (
                        <Button variant="dark" onClick={handleAddCompany}>
                        Add to List
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Home;