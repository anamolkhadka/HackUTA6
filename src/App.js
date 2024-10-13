import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NavScroll from './components/NavScroll';
import StockDetails from './components/StockDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';


// Utility functions for session cookies
function setSessionCookie(name, value) {
  const jsonValue = JSON.stringify(value); // Convert array to JSON string
  document.cookie = `${name}=${jsonValue}; path=/;`; // Set the cookie
}

function getSessionCookie(name) {
  const cookieArr = document.cookie.split(";"); // Split all cookies
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return JSON.parse(cookiePair[1]); // Convert JSON string back to array
    }
  }
  return null; // Return null if cookie not found
}

function App() {
  const [search, setSearch] = useState('');  // Manage search state in App
  ///const [companies, setCompanies] = useState([]);  // Manage companies in App

  const [companies, setCompanies] = useState(() => {
    const savedCompanies = getSessionCookie('companies'); // Retrieve from session cookie
    return savedCompanies ? savedCompanies : []; // Initialize with stored value or empty array
  });

  useEffect(() => {
    // Save companies to session cookie whenever the companies array changes
    setSessionCookie('companies', companies);
  }, [companies]);

  // Function to handle adding a company
  const addCompany = (companyDetails) => {
    setCompanies((prevCompanies) => [...prevCompanies, companyDetails]);
  };

  // Function to delete a company from the list.
  const deleteCompany = (ticker) => {
    const updatedCompanies = companies.filter(company => company.ticker !== ticker);
    setCompanies(updatedCompanies); // Update the companies array in state

  };

  return (
    <Router>
      <div className="App">
        {/* Include the Navbar in all routes */}
        <NavScroll setSearch={setSearch} />

        <Routes>
          <Route path='/' element={<Home 
            search={search} 
            setSearch={setSearch} 
            companies={companies} 
            addCompany={addCompany}
            deleteCompany={deleteCompany}
          />} />
          <Route path='/about' element={<About />} />
          <Route path='/stock/:ticker' element={<StockDetails />} />
        </Routes>
      </div>

    </Router>

  );
}

export default App;
