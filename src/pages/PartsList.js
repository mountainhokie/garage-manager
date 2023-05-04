import React, { useContext, useState } from "react";
import { ItemsContext } from "../ItemsContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PartModal from '../components/PartModal'
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

function PartsList() {
	const { loading } = useContext(ItemsContext);
	const [ modalOpen, setModalOpen ] = useState(false);

	const partsList = useLiveQuery( () => db.partslist.toArray() );

	return (
		<div>
			<h1 className="title is-1">Parts List</h1>

			{loading ? (
				"Loading..."
				) : (!partsList || partsList.length < 1) ? (
					<p className="text-center m-5"> Nothing to display ☹️ </p>
				) : (
				<table className="parts-table">
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
			<div className="bottom-btns">
				<button className="button btn-primary" onClick={() => setModalOpen(true)}>
					<FontAwesomeIcon icon={faPlus} /> Add Part
				</button>
				<PartModal type="partslist" modalOpen={modalOpen} setModalOpen={setModalOpen} />
			</div>
		</div>
	);
}
export default PartsList;