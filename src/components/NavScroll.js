import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavScroll.css';


function NavScroll({setSearch}){
    const [query, setQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query) {
            setSearch(query);  // Pass the search query to the parent component (Home)
            setQuery('')
        }
    };

    return(
        <Navbar expand="lg" className='bg-body-teritiary navbar-custom' >
            <Container>
                    <Navbar.Brand className='navbar-items' style={{fontSize:'2.0rem', fontWeight: 'bold' }}>Stock Analyzer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navbar-items">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>

                        {/* Ticket symbol search bar*/}
                        <Form className="search-box" onSubmit={handleSearchSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Ticker Symbol"
                                className="me-2 search-box"
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}  // Update the query state
                                required
                            />
                            <Button variant='dark' type='submit'>Search</Button>
                        </Form>

                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScroll;