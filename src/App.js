import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NavScroll from './components/NavScroll';
import StockDetails from './components/StockDetails';
import { db } from './components/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';


function App() {
  const [search, setSearch] = useState('');  // Manage search state in App
  const [companies, setCompanies] = useState([]);  // Manage companies in App
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch companies from Firestore when the app loads
  useEffect(() => {
    const fetchCompaniesFromFirestore = async () => {
      const companiesCollection = collection(db, 'companies'); // Get the 'companies' collection
      const companySnapshot = await getDocs(companiesCollection); // Fetch all documents
      const companyList = companySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(companyList); // Set the companies state with data from Firestore
      setLoading(false);  // Set loading to false after data is fetched
    };

    fetchCompaniesFromFirestore();
  }, []);

  // Function to handle adding a company
  const addCompany =  async (companyDetails) => {
    try {
      const docRef = await addDoc(collection(db, 'companies'), companyDetails); // Add new company document
      setCompanies((prevCompanies) => [...prevCompanies, { id: docRef.id, ...companyDetails }]); // Update local state
    } catch (error) {
      console.error("Error adding company to database: ", error);
    }
  };

  // Function to delete a company from the list.
  const deleteCompany = async (ticker) => {
    try {
      // Find the company by ticker and get its Firestore document ID
      const companyToDelete = companies.find(company => company.ticker === ticker);
      if (companyToDelete) {
        await deleteDoc(doc(db, 'companies', companyToDelete.id)); // Delete the company document from Firestore
        setCompanies(companies.filter(company => company.ticker !== ticker)); // Update state
      }
    } catch (error) {
      console.error("Error deleting company from Firestore: ", error);
    }

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
            loading={loading}  // Pass the loading state
          />} />
          <Route path='/about' element={<About />} />
          <Route path='/stock/:ticker' element={<StockDetails />} />
        </Routes>
      </div>

    </Router>

  );
}

export default App;
