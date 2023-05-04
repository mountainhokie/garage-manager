import React, { useState, useContext } from 'react';
import { ItemsContext } from "../ItemsContext";
import PartModal from "../components/PartModal";
import { motion } from "framer-motion";
import BuildList from '../components/BuildList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEraser } from '@fortawesome/free-solid-svg-icons'

const container = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};


export default function BuildCalculator() {
	const { buildList, setBuildList, buildTotal, setBuildTotal, loading } = useContext(ItemsContext);
	// const [ buildTotal, setBuildTotal ] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);

	const clearStorage = () => {
		localStorage.clear();
		setBuildTotal(0);
		setBuildList([]);
	}

	return(
		<>
			<h1>Build Calculator</h1>
			<p>Total Cost: ${buildTotal}</p>

			<div className="appHeader">
				<button className="button btn-primary" onClick={() => setModalOpen(true)}>
					<FontAwesomeIcon icon={faPlus} /> Add Part
				</button>
				<button className="button btn-secondary" onClick={() => clearStorage()}>
					<FontAwesomeIcon icon={faEraser} /> Clear Parts
				</button>
			</div>

				<motion.div
					className="content__wrapper2"
					variants={container}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>

					{loading ? (
						"Loading..."
					) : buildList.length < 1 ? (
						<p className="text-center m-5"> Nothing to display ☹️ </p>
					) : (
					<table className="parts-table parts-table-vehicle">
						<thead>
							<tr>
								<th>Part</th>
								<th>Category</th>
								<th>Price</th>
								<th>#</th> 
								<th>Total</th>
								<th></th>
							</tr>
							</thead>
						<tbody>
							<BuildList />
						</tbody>
					</table>
					)}

				</motion.div>


			<PartModal type="build" modalOpen={modalOpen} setModalOpen={setModalOpen} />

		</>
	) 	

}