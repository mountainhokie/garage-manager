import React from "react";
import logo from './../images/logo.png';
import { NavLink } from "react-router-dom";

const Home = () => (
	<header>
		<img src={logo} className="App-logo" alt="logo" />
		<h1 className="hidden"> 
			Garage Manager
		</h1>

		<div>
			<div className="home-nav">
				<NavLink className="navbar-item" to="/buyit">
					<button className="button">Should I Buy It?</button>
				</NavLink>
				<NavLink className="navbar-item" to="/vehicles">
					<button className="button">Vehicle List</button>
				</NavLink>
				<NavLink className="navbar-item" to="/partslist">
					<button className="button">Parts List</button>
				</NavLink>
				<NavLink className="navbar-item" to="/inspection">
					<button className="button">Inspection List</button>
				</NavLink>
				<NavLink className="navbar-item" to="/buildcalculator">
					<button className="button">Build Calculator</button>
				</NavLink>
			</div>
		</div>
	</header>
);

export default Home;