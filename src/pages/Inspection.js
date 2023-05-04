import React, { useState } from "react";
import inspectionJSON from '../data/inspection.json';
import InspectionList from '../components/InspectionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'

export default function Inspection(todo) {
	const [inspectionList, setInspectionList] = useState(inspectionJSON);

	const clearStorage = () => {
		localStorage.clear();
		setInspectionList([]);
		window.location.reload();
	}

	return(
		<>
			<h1>Inspection List</h1>

			{ inspectionList.length ? (
				inspectionList.map((item) => (
					<InspectionList key={item.area} item={item} />
				))
			) : (
				<p className="emptyText">
					No Inspection Items Found.
				</p>
			)}

			<div className="bottom-btns float-end">
				<button className="button btn-secondary" onClick={() => clearStorage()}>
					<FontAwesomeIcon icon={faEraser} /> Clear Inspection
				</button>
			</div>

		</>
	)
}