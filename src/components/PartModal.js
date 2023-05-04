import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
// import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { ItemsContext } from "../ItemsContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

const dropin = {
	hidden: {
		scale: 0.9,
		opacity: 0,
	},
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
		marginTop: '40px'
	},
	exit: {
		scale: 0.9,
		opacity: 0,
	},
};

function PartModal({ type, modalOpen, setModalOpen, vehicleID, todo }) {
	const formRef = useRef();
	const { addBuildItem, addPart } = useContext(ItemsContext);
	const [ part, setPart] = useState("");
	const [ status ] = useState("incomplete");
	const [ setBuildItem] = useState("");
	const [ showVehicleParts, setShowVehicleParts ] = useState(false);
	const [ showVehicleSelect, setShowVehicleSelect] = useState(false);

	const vehicles = useLiveQuery(() => db.vehicles.toArray());


	useEffect(() => {
		if(type === 'vehicle')
			setShowVehicleParts(true);
		else if(type === 'partslist'){
			// getVehicles();
			setShowVehicleParts(true);
			setShowVehicleSelect(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const getVehicleList = () => {
		return vehicles.map((vehicle, indx) => {
			return <option key={indx} value={vehicle.id}>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</option>;
		})
	};

	const handleSumbit = (e) => {
		e.preventDefault();
		const data = new FormData(formRef.current);

		if (part === "") {
			toast.error("Please enter a part.");
			return;
		}
		if (part && status) {
			if (type === "build") {
				try {
					addBuildItem(data);
					setBuildItem("");
					setModalOpen(false);
				} catch (err) {
					console.log(err);
				}
			} else {
				try {
					addPart(data, type);
					setPart("");
				} catch (err) {
					console.log(err);
				}
			}
			setModalOpen(false);
		}
	};

	return (
		<AnimatePresence

		>
		{modalOpen && (
			<motion.div
				key="modal"
				className="modal-wrapper"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.div
					className="modal-container"
					variants={dropin}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<motion.div
						className="closeButton"
						onClick={() => setModalOpen(false)}
						onKeyDown={() => setModalOpen(false)}
						tabIndex={0}
						role="button"
						initial={{ top: 40, opacity: 0 }}
						animate={{ top: 49, opacity: 1, zIndex:5 }}
						exit={{ top: 40, opacity: 0 }}
					>
						<MdOutlineClose />
					</motion.div>
					<div className="modal-container-inside">
						<Form className="modal-form" ref={formRef} onSubmit={handleSumbit} >
							<Form.Group className="mb-3">
				            	<Form.Label>Category</Form.Label>
				            	<Form.Select name="category">
				              		<option>Category</option>
				 					<option value="Administrative">Administrative</option>
									<option value="Engine">Engine</option>
									<option value="Exterior">Exterior</option>
									<option value="Fixes">Fixes</option>
									<option value="Interior">Interior</option>
									<option value="Maintenance">Maintenance</option>
									<option value="Suspension">Suspension</option>
									<option value="Transmission">Transmission</option>
				            	</Form.Select>
				        	</Form.Group>

				        	<Form.Group className="mb-3">
				          		<Form.Label htmlFor="partInput">Part</Form.Label>
				          		<Form.Control id="partInput" placeholder="part" name="part" onChange={(e) => setPart(e.target.value)} />
				        	</Form.Group>

				        	<Form.Group className="mb-3">
				          		<Form.Label htmlFor="priceInput">Price</Form.Label>
				          		<Form.Control id="priceInput" placeholder="price" name="price_unit" />
				        	</Form.Group>          

				        	<Form.Group className="mb-3">
				          		<Form.Label htmlFor="quantityInput">Quantity</Form.Label>
				          		<Form.Control id="quantityInput" placeholder="quantity" name="quantity" />
				        	</Form.Group>          
				        	{showVehicleParts && 
				        		<>
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
								</>
							}
							{ (showVehicleParts && !showVehicleSelect) &&
				             	 <input name='veh_id' value={vehicleID} type="hidden"  />
							}
							{showVehicleSelect && 
								<Form.Group className="mb-3">
									<Form.Label htmlFor="Input">Vehicle</Form.Label>
									<Form.Select name="veh_id">
										<option>Select Vehicle</option>
										{getVehicleList()}
									</Form.Select>
								</Form.Group>  
							}

				          	<Button variant="primary" type="submit">
				            	Submit
				          	</Button>
				        </Form>
				    </div>
				</motion.div>
			</motion.div>
			)}
		</AnimatePresence>
		);
}

export default PartModal;