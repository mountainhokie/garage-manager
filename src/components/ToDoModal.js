import React, { useContext, useEffect, useState, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
//import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { ItemsContext } from "../ItemsContext";

const dropin = {
	hidden: {
		opacity: 0,
		transform: "scale(0.9)",
	},
	visible: {
		transform: "scale(1)",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		transform: "scale(0.9)",
		opacity: 0,
	},
};

function TodoModal({ type, modalOpen, setModalOpen, vehicleID, todo }) {
	const formRef = useRef();
	const {addToDoItem, updateToDoItem } = useContext(ItemsContext);
	const [task, setTask] = useState("");
	const [status, setStatus] = useState("incomplete");
	const [category, setCategory] = useState("");
	const [setToDoItem] = useState("");

	useEffect(() => {

		if (type === "update" && todo) {
			setTask(todo.task);
			setStatus(todo.status);
			setCategory(todo.category);
		} else {
			setTask("");
			setStatus("incomplete");
		}
	}, [type.todo, modalOpen]);

	const handleSumbit = (e) => {
		e.preventDefault();
		const data = new FormData(formRef.current);

		if (task === "") {
			toast.error("Please enter a task.");
			return;
		}
		if (task && status) {
			if (type === "add") {
				// const data = new FormData(formRef.current);

				try {
					addToDoItem(data,vehicleID);
					// setToDoItem("");					
					setModalOpen(false);
				} catch (err) {
					console.log(err);
				}

			}
			if (type === "update") {
				// const data = new FormData(formRef.current);
				if (todo.task !== task || todo.status !== status || todo.category !== category) {
					updateToDoItem({
						...todo,
						task: task,
						category: category,
						status: status
					})
				} else {
					toast.error("No Changes Made");
					return;
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
						animate={{ top: 49, opacity: 1 }}
						exit={{ top: 40, opacity: 0 }}
					>
						<MdOutlineClose />
					</motion.div>
					<div className="modal-container-inside">
						<form className="modal-form" onSubmit={(e) => handleSumbit(e)} ref={formRef}>
							<h1 className="formTitle">
								{type === "update" ? "Update" : "Add"} Task
							</h1>
							<label htmlFor="task">Task
								<input
									value={task}
									name="task"
									type="text"
									id="task"
									onChange={(e) => setTask(e.target.value)}
								/>
							</label>
							<label htmlFor="status">Status
								<select
									name="status"
									id="status"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
								>
									<option value="incomplete">Incomplete</option>
									<option value="complete">Complete</option>
								</select>
							</label>
							<label htmlFor="Category">Category
								<select
									name="category"
									id="category"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								>
									<option value="Administrative">Administrative</option>
									<option value="Engine">Engine</option>
									<option value="Exterior">Exterior</option>
									<option value="Fixes">Fixes</option>
									<option value="Interior">Interior</option>
									<option value="Maintenance">Maintenance</option>
									<option value="Suspension">Suspension</option>
									<option value="Transmission">Transmission</option>
								</select>
							</label>
							<div className="buttonContainer">
								<button type="submit" className="button btn-primary">
									{type === "update" ? "Update" : "Add"} Task
								</button>
								<button
									type="button"
									className="button btn-secondary"
									onClick={() => setModalOpen(false)}
									onKeyDown={() => setModalOpen(false)}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</motion.div>
			</motion.div>
			)}
		</AnimatePresence>
		);
}

export default TodoModal;