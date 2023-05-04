import React, { useContext } from "react";
import { ItemsContext } from "../ItemsContext";
import { NavLink } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";


function Vehicles() {
	const { loading } = useContext(ItemsContext);
	const vehiclesList = useLiveQuery(() => db.vehicles.toArray());

	return (
		<div className="vehicle-list">
			<h1>Vehicle List</h1>
			<ListGroup variant="flush">
				{loading ? (
					"Loading..."
				) : ( !vehiclesList || vehiclesList.length < 1) ? (
					<p className="text-center m-5"> Nothing to display ☹️ </p>
				) : (
					vehiclesList.map((vehicle, index) => (
						<ListGroup.Item key={vehicle.id}>
							<NavLink to={`${process.env.PUBLIC_URL}/vehicle/${vehicle.id}`}>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</NavLink>
						</ListGroup.Item>
					))
				)}
			</ListGroup>
			<div className="bottom-btns">
				<NavLink className="navbar-item" to="/addvehicle">
					<button type="button" className="btn btn-default btn-page">
						<FontAwesomeIcon icon={faPlus} /> Add Vehicle
					</button>
				</NavLink>
			</div>
		</div>
	);
}

export default Vehicles;