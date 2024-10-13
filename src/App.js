import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NavScroll from './components/NavScroll';
import StockDetails from './components/StockDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';

function App() {
  const [search, setSearch] = useState('');  // Manage search state in App
  const [companies, setCompanies] = useState([]);  // Manage companies in App

  // Function to handle adding a company
  const addCompany = (companyDetails) => {
    setCompanies((prevCompanies) => [...prevCompanies, companyDetails]);
  };

  return (
    <Router>
      <div className="App">
        {/* Include the Navbar in all routes */}
        <NavScroll setSearch={setSearch} />

        <Routes>
          <Route path='/' element={<Home search={search} setSearch={setSearch} companies={companies} addCompany={addCompany}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/stock/:ticker' element={<StockDetails />} />
        </Routes>
      </div>

    </Router>

  );
}

export default App;
