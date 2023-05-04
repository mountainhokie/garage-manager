import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import smlogo from './../images/logo-small.png';
import { NavLink } from "react-router-dom";

function NavigationBar() {

	const [expanded, setExpanded] = useState(false);

	return (
		<Navbar bg="dark" variant="dark" expand="false" fixed="top" expanded={expanded}>
			<Container>
				<Navbar.Brand as={NavLink} to="/"><img src={smlogo} className="navbar-logo" alt="Garage Manager" /></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}  />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<NavLink className="navbar-item" to="/" onClick={() => setExpanded(false)}>Home</NavLink>
						<NavLink className="navbar-item" to="/vehicles" onClick={() => setExpanded(false)} >Vehicles</NavLink>
						<NavLink className="navbar-item" to="/buyit" onClick={() => setExpanded(false)} >Buy It?</NavLink>
						<NavLink className="navbar-item" to="/partslist" onClick={() => setExpanded(false)} >Parts List</NavLink>
						<NavLink className="navbar-item" to="/inspection" onClick={() => setExpanded(false)} >Inspection List</NavLink>
						<NavLink className="navbar-item" to="/buildcalculator" onClick={() => setExpanded(false)} >Build Calculator</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		);
}

export default NavigationBar;