import { useContext, useEffect, useState } from "react";
import TodoModal from "./ToDoModal";
import CheckButton from "./CheckButton";
import { ItemsContext } from "../ItemsContext";
import { motion } from "framer-motion";
import { MdDelete, MdEdit } from "react-icons/md";
import { getClasses } from "../utils/getClasses";
import toast from "react-hot-toast";
import { db } from "../db";

const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const TodoItem = ({ todo, onDelete }) => {
	const [ updateModalOpen, setUpdateModalOpen ] = useState(false);
	const { updateToDoItem } = useContext(ItemsContext);
	const [ checked, setChecked ] = useState(false);

	useEffect(() => {
		if (todo.status === "complete") {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [todo.status]);

	
    const handleDelete = async ()  => {
        await db.todos.delete(todo.id);
        toast.success("To Do Deleted Successfully.");
    };
	
	const handleUpdate = () => {
		setUpdateModalOpen(true);
	};

	const handleCheck = () => {
		setChecked(!checked);
		updateToDoItem({
			...todo,
			status: checked ? "incomplete" : "complete",
		})
	};

	return (
		<>
			<motion.div className="item" variants={child}>
				<div className="todoDetails">
					<CheckButton checked={checked} handleCheck={handleCheck} />
					<div className="texts">
						<p
							className={getClasses([
							"todoText",
							todo.status === "complete" && "todoText--completed",
							])}
						>
							{todo.task}
						</p>
						<p className="time">{todo.category}</p>
					</div>
				</div>
				<div className="todoActions">
					<div
						className="icon"
						onClick={handleDelete}
						role="button"
						onKeyDown={handleDelete}
						tabIndex={0}
					>
						<MdDelete />
					</div>
					<div
						className="icon"
						onClick={handleUpdate}
						role="button"
						onKeyDown={handleUpdate}
						tabIndex={0}
					>
						<MdEdit />
					</div>
				</div>
			</motion.div>

			<TodoModal type="update" todo={todo} modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} />
		</>
		);
};

export default TodoItem;
