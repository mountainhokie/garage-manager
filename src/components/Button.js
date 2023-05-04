import React from "react";


export default function Button({ children, type, variant, ...rest }) {
	return (
		<button
			type={type === "submit" ? "submit" : "button"}
			{...rest}
		>
			{children}
		</button>
		);
}

function SelectButton({ children, ...rest }) {
	return (
		<select
			{...rest}
		>
			{children}
		</select>
		);
}
export { SelectButton };