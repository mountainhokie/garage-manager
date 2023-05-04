import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../ItemsContext";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

export default function BuildList() {
	const { buildList, setBuildList, setBuildTotal  } = useContext(ItemsContext);

	useEffect(() => {
		let tempTotal = 0;
		buildList.map((rowContent, rowID) =>
			(tempTotal += Number(rowContent.price_unit)*Number(rowContent.quantity))
		);
		setBuildTotal(tempTotal.toFixed(2));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buildList]);


	const getPriceUnit = (price_unit) => {
		return parseFloat(price_unit).toFixed(2);
	}

	const getTotal = (price_unit, quantity) => {
		return (price_unit*quantity).toFixed(2);
	}

  	const handleDelete = (part2Delete) => {
	    const removeItem = buildList.filter((part) => {
	       return part.id !== part2Delete;
	    });
	    setBuildList(removeItem);
	    localStorage.setItem("buildList", JSON.stringify(removeItem));
	    toast.success("Build Part Delete Successful");
	 };

	return (
		<>
			{buildList.length ? (
				buildList.map((part) => (
					<tr key={part.id}>
						<td>{part.part}</td>
						<td>{part.category}</td>
						<td>${getPriceUnit(part.price_unit)}</td>
						<td>{part.quantity}</td>
						<td>${getTotal(part.price_unit, part.quantity)}</td>
						<td>
							<div
								className="icon"
								onClick={() => handleDelete(part.id)}
								role="button"
								onKeyDown={() => handleDelete(part.id)}
								tabIndex={0}
							>
								<MdDelete />
							</div>
						</td>
					</tr>
				))
			) : (
			<tr className="emptyText">
				<td colspan="6">No Todo Found</td>
			</tr>
			)}
		</>
	);
}