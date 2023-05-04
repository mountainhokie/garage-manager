import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../ItemsContext";
import { useParams, NavLink } from "react-router-dom";
import PartModal from "../components/PartModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

function TableRow(props) {
	let part = props.rowContent;
	const priceUnit = Number(part.price_unit).toFixed(2);
	let total = 0;
	total = (part.price_unit * part.quantity).toFixed(2);

	return (
		<tr key={part.id}>
			<td><NavLink to={`${process.env.PUBLIC_URL}/part/${part.id}`}>{part.part}</NavLink></td>
			<td><NavLink to={`${part.url}`} target="_blank">Buy</NavLink></td>
			<td>${priceUnit}</td>
			<td>{part.quantity}</td>
			<td>${total}</td>
		</tr>
	)
}

function PartsListVehicle() {
	const { vehicleID } = useParams();
	const { loading } = useContext(ItemsContext);
	const [ modalOpen, setModalOpen ] = useState(false);

	const partsList = useLiveQuery(
		() => db.partslist
		  .where('veh_id')
		  .equals(vehicleID)
		  .toArray()
	  );

	useEffect(() => {
		// getPartsListVehicle(vehicleID);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	return (
		<>

			<div className="appHeader">
				<button className="button btn-primary" onClick={() => setModalOpen(true)}>
					<FontAwesomeIcon icon={faPlus} /> Add Part
				</button>
				
				<PartModal type="vehicle" modalOpen={modalOpen} setModalOpen={setModalOpen} vehicleID={vehicleID} />
				
			</div>


			{loading ? (
				"Loading..."
				) : (!partsList || partsList.length < 1) ? (
					<p className="text-center m-5"> Nothing to display ☹️ </p>
				) : (
				<table className="parts-table parts-table-vehicle">
					<thead>
						<tr>
							<th>Part</th>
							<th>Link</th>
							<th>$ Per</th>
							<th>#</th> 
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{partsList.map((rowContent, rowID) => <TableRow rowContent={rowContent} key={rowID} />)}
					</tbody>
				</table>
			)}
		</>
	);
}
export default PartsListVehicle;