import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ItemsContext } from "../ItemsContext";

function AddVehicle() {
	const { getVehicles, vehicles } = useContext(ItemsContext);
	const [ , setPart ] = useState("");
	const { addPart } = useContext(ItemsContext);
	const formRef = useRef();
	const navigate = useNavigate();
	const getVehicleList = () => {
		return vehicles.map((vehicle, indx) => {
			return <option key={indx} value={vehicle.id}>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</option>;
		})
	};

	const formSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(formRef.current);

		try {
			await addPart(data);
			setPart("");
			navigate("/partslist");
		} catch (err) {
			console.log(err);
		}
	// validate and save
	};


	useEffect(() => {
		// let ignore = false;

		getVehicles();

		// return () => {
		// 	ignore = true;
		// };
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

	return (
		<div>
			<h1 className="title is-1">Add Part</h1>

			<Form onSubmit={formSubmit} ref={formRef}>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="partInput">Part</Form.Label>
					<Form.Control id="partInput" placeholder="Part" name="part" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="partNoInput">Part Number</Form.Label>
					<Form.Control id="part_noInput" placeholder="Part Number" name="part_no" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="Input">Link</Form.Label>
					<Form.Control id="urlInput" placeholder="http://www.google.com" name="url" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="Input">Vendor</Form.Label>
					<Form.Control id="vendorInput" placeholder="Vendor" name="vendor" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="Input">Price Per Unit</Form.Label>
					<Form.Control id="price_unitInput" placeholder="X.XX" name="price_unit" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="Input">Quantity</Form.Label>
					<Form.Control id="quantityInput" placeholder="1" name="quantity" />
				</Form.Group> 
				<Form.Group className="mb-3">
					<Form.Label htmlFor="Input">Vehicle</Form.Label>
					<Form.Select name="veh_id">
						<option>Select Vehicle</option>
						{getVehicleList()}
					</Form.Select>
				</Form.Group>          
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>

		</div>

		);
}

export default AddVehicle;
