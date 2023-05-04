import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../ItemsContext";
import CheckButton from "./CheckButton";
import Form from 'react-bootstrap/Form';

export default function InspectionItem(item) {
	const { updateInspectionItem  } = useContext(ItemsContext);
	const [ checked, setChecked ] = useState(false);
	const [ switched, setSwitched ] = useState(false);
	const [ notes, setNotes ] = useState("");

	useEffect(() => {
		const iItem = item.item;
		const retrievedString = localStorage.getItem(iItem);
		const parsedObject = JSON.parse(retrievedString);
		if(parsedObject){
			if(parsedObject.status) setChecked(!checked)
			if(parsedObject.issue) setSwitched(!switched)
			if(parsedObject.notes) setNotes(parsedObject.notes)
		}
	}, []);


	const handleCheck = () => {
		setChecked(!checked);
		updateInspectionItem({
			...item,
			status: !checked,
			issue: switched,
			notes: notes
		})
	};

	const handleSwitch = () => {
		setSwitched(!switched);
		updateInspectionItem({
			...item,
			status: checked,
			issue: !switched,
			notes: notes
		})
	}

	const handleNotes = (e) => {
		setNotes(e.target.value);
		updateInspectionItem({
			...item,
			status: checked,
			issue: switched,
			notes: e.target.value
		})
	}

	return(
		<div className="item inspection-item">
			<div className="insp-type-check">
				<CheckButton checked={checked} handleCheck={handleCheck} />
				<div className="insp-type">{item.item}</div>
			</div>
			<div className="insp-issues">
				<div className="texts issue-switch">
					<Form.Check 
						reverse
						type="switch"
						id="custom-switch"
						label="Issues"
						onChange={handleSwitch}
						checked={switched}
					/>
				</div>
			</div>
			<div className="insp-notes">
				<Form.Control id="notesInput" placeholder="Notes" name="notes" onBlur={handleNotes} defaultValue={notes} />
			</div>
		</div>
	)
}