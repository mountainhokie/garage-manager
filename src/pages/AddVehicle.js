import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cars from '../data/cars.json';
import { ItemsContext } from "../ItemsContext";

function AddVehicle() {
	const [carList] = useState(cars);
	const [, setYear] = useState(null);
	const [make, setMake] = useState(null);
	const [showMake, setShowMake] = useState(false);
	const [showModel, setShowModel] = useState(false);
	const [showTrim, setShowTrim] = useState(false);
	const [, setMakeList] = useState([]);
	const [, setVehicle] = useState("");
	const { addVehicle } = useContext(ItemsContext);
	const formRef = useRef();
	const navigate = useNavigate();

	const getYearList = () => {
		const year = new Date().getFullYear();
		return (
			Array.from( new Array(90), (v,i) =>
				<option key={i} value={year-i}>{year-i}</option>
				)
			);
	};

	const getMakeList = () => {
		return carList.map((allMakes, indx) => {
			return <option key={indx} value={allMakes.brand}>{allMakes.brand}</option>;
		})
	};

	const getModelList = () => {
		var selMake = carList.filter(item => item.brand.match(make));
		var newCarLst = selMake[0].models;
		return newCarLst.map((allModels, indx) => {
			return <option key={indx} value={allModels}>{allModels}</option>;
		})
	};

	const handleYearChange = e => {
		setYear(e.target.value);
		setMakeList(e.makes);
		setShowMake(true);
	};

	const handleMakeChange = e => {
		setShowModel(true);
		setMake(e.target.value);
	};

	const handleModelChange = e => {
		setShowTrim(true);
	};

	const formSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(formRef.current);

		try {
			await addVehicle(data);
			setVehicle("");
			navigate("/vehicles");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
		<h1 className="title is-1">Add New Vehicle</h1>

		<Form onSubmit={formSubmit} ref={formRef}>
			<Form.Group className="mb-3">
				<Form.Label>Year</Form.Label>
				<Form.Select onChange={handleYearChange} name="year">
					<option>Select Year</option>
					{getYearList()}
				</Form.Select>
			</Form.Group>

			{showMake && <Form.Group className="mb-3">
				<Form.Label>Make</Form.Label>
				<Form.Select onChange={handleMakeChange} name="make">
					<option>Make</option>
					{getMakeList()}
				</Form.Select>
			</Form.Group>}

			{showModel && <Form.Group className="mb-3">
				<Form.Label htmlFor="modelInput">Model</Form.Label>
				<Form.Select onChange={handleModelChange} name="model">
					<option>Model</option>
					{getModelList()}
				</Form.Select>
			</Form.Group>}    

			{showTrim && <Form.Group className="mb-3">
				<Form.Label htmlFor="trimInput">Trim</Form.Label>
				<Form.Control id="trimInput" placeholder="Trim" name="trim" />
			</Form.Group>}          

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>

		</div>

		);
}

export default AddVehicle;
