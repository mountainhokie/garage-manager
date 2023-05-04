import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemsContext } from "../ItemsContext";
import TodoModal from "./ToDoModal";
import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "./TodoItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

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

const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

export default function ToDoList() {
	const { vehicleID } = useParams();
	const [modalOpen, setModalOpen] = useState(false);
	const [ todoStatus, setTodoStatus ] = useState('incomplete');

	const todosList = useLiveQuery(
		() => db.todos
		  .where('status').equals( todoStatus )
		  .and(item => item.veh_id === vehicleID)
		  .toArray(),
		  [todoStatus]
	);

	const updatedFilter = (e) => {
		setTodoStatus(e.target.value);
	};

	return (
		<>
			<div className="appHeader">
				<button className="button btn-primary" onClick={() => setModalOpen(true)}>
					+ Add Task
				</button>
				<select id="status" className="button btn-secondary filter-select" onChange={updatedFilter}>
					<option value="incomplete">Incomplete</option>
					<option value="complete">Complete</option>
				</select>
				
				<TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} vehicleID={vehicleID} />
				
			</div>

			<AnimatePresence>
				<motion.div
					className="content__wrapper"
					variants={container}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					{ (!todosList || todosList.length < 1) ? (
						<motion.p className="emptyText" variants={child}>
							No Todo Found
						</motion.p>
					) : (
						todosList.map((todo) => (
							<TodoItem key={todo.id} todo={todo}  />
						))
					)}
				</motion.div>
			</AnimatePresence>
		</>
	);
}