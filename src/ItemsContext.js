import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { db } from "./db";

// Initializing context
export const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {
	const [adding, setAdding] = useState(false);
	const [buildList, setBuildList] = useState(localStorage.getItem("buildList") != null ? JSON.parse(localStorage.getItem("buildList")): []);
	const [buildTotal, setBuildTotal] = useState(0);
	const [inspectionList, setInspectionList] = useState(localStorage.getItem("inspectionList") != null ? JSON.parse(localStorage.getItem("inspectionList")): []);


	/* -------------------------------
				Build Section 
	---------------------------------- */

	const addBuildItem = async (data) => {
		setAdding(true);
		try {
			await localStorage.setItem("buildList", JSON.stringify([
				...buildList, 
				{
					id: buildList.length + 1,
					category:  data.get('category'),
					part: data.get('part'),
					price_unit: data.get('price_unit'),
					quantity: data.get('quantity')
				}
			]));

			let buildID;
			if(buildList.length)
				buildID = buildList.length + 1;
			else
				buildID = 1;

			setBuildList([
				...buildList,
				{
					id: buildID,
					category:  data.get('category'),
					part: data.get('part'),
					price_unit: data.get('price_unit'),
					quantity: data.get('quantity')
				}
			]);
			toast.success("Part Added Successfully");
		} catch (error) {
			console.log(error.error_description || error.message);
			toast.error("Sorry, you can't make updates to the demo app.");
		} finally {
			setAdding(false);
		}
	};



	/* -------------------------------
				ToDo Section 
	---------------------------------- */

	const addToDoItem = async (item,vehicleID) => {
		setAdding(true);
		try {
			const task = item.get('task');
			const status = item.get('status');
			const veh_id  = vehicleID;
			const category = item.get('category');

			const id = await db.todos.add({
				task,
				status,
				veh_id,
				category
			});

			toast.success("Task Added Successfully");
		} catch (error) {
			console.log(error.error_description || error.message);
			toast.error("Sorry, you can't make updates to the demo app.");
		} finally {
			setAdding(false);
		}
	};

	const updateToDoItem = async (todo,action) => {
		await db.todos.update(Number(todo.id), {
			status: todo.status,
			task: todo.task,
			category: todo.category
		})
		toast.success("Task Update Successful");
	};




	/* -------------------------------
				Vehicles Section 
	---------------------------------- */

	const addVehicle = async (item) => {
		setAdding(true);
		try {
			const year = item.get('year');
			const make = item.get('make');
			const model = item.get('model');
			const trim = item.get('trim');
			const transmission = ''; 
			const odometer = '';
			const purprice = '';
			const purdate = '';
			const vin = '';

			const id = await db.vehicles.add({
				year,
				make,
				model,
				trim,
				transmission, 
				odometer, 
				purprice, 
				purdate, 
				vin
			});

			toast.success("Vehicle Added Successfully");

		} catch (error) {
			console.log(error.error_description || error.message);
			toast.error("Sorry, you can't make updates to the demo app.");
		} finally {
			setAdding(false);
		}
	};

	const updateVehicle = async (vehicleID,inputField,inputValue,vehicle) => {
		await db.vehicles.update(Number(vehicleID), {[inputField]: inputValue})
		toast.success("Vehicle Updated Successfully.")
	};



	/* -------------------------------
				Parts Section 
	---------------------------------- */

	// add new row to the database
	const addPart = async (item,type) => {
		setAdding(true);
		try {
			const veh_id = item.get('veh_id');
			const part = item.get('part');
			const part_no = item.get('part_no');
			const url = item.get('url');
			const price_unit = item.get('price_unit');
			const quantity = item.get('quantity');
			const vendor = item.get('vendor');

			const id = await db.partslist.add({
				veh_id, part, part_no, url, price_unit, quantity, vendor
			});

			toast.success("Part Added Successfully");
		} catch (error) {
			console.log(error.error_description || error.message);
			toast.error("Sorry, you can't make updates to the demo app.");
		} finally {
			setAdding(false);
		}
	};

	const updatePart = async (partID,inputField,inputValue,part) => {
		await db.partslist.update(Number(partID), {[inputField]: inputValue})
		toast.success("Part Updated Successfully");
	};



	/* -------------------------------
				Inspection Section 
	---------------------------------- */

	const updateInspectionItem = async (data) => {
		setAdding(true);
		try {

			await localStorage.setItem(data.item, JSON.stringify(
				{
					status: data.status,
					issue: data.issue,
					notes: data.notes
				}
			));

			setInspectionList([
				// copy the current values in state
				...data.item,
				{
					status: data.status,
					issue: data.issue,
					notes: data.notes
				}
			]);
		} catch (error) {
			console.log(error.error_description || error.message);
			toast.error("Sorry, you can't make updates to the demo app.");
		} finally {
			setAdding(false);
		}
	};



	return (
		<ItemsContext.Provider
			value={{
				adding,
				addVehicle,
				addPart,
				addToDoItem,
				updateToDoItem,
				updateVehicle,
				updatePart,
				addBuildItem,
				buildList,
				setBuildList,
				buildTotal,
				setBuildTotal,
				updateInspectionItem,
				inspectionList
			}}
		>
			{children}
		</ItemsContext.Provider>
	);
}
