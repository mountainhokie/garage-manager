import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

const checkVariant = {
	initial: {
		color: "#fff",
	},
	checked: {
		pathLength: 1,
	},
	unchecked: {
		pathLength: 0,
	},
};

const boxVariant = {
	checked: {
		background: "var(--dark-purple)",
	},
	unchecked: {
		background: "var(--gray-1)",
	},
};

function CheckButton({ checked, handleCheck }) {
	const pathLength = useMotionValue(0);
	const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

	return (
		<motion.div
			className="svgBox"
			variants={boxVariant}
			animate={checked ? "checked" : "unchecked"}
			onClick={handleCheck}
		>
			<motion.svg
				className="svg"
				viewBox="0 0 53 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<motion.path
					variants={checkVariant}
					animate={"checked" ? "checked" : "unchecked"}
					style={{ pathLength, opacity }}
					fill="none"
					strokeMiterlimit="10"
					strokeWidth="6"
					d="M1.5 22L16 36.5L51.5 1"
					strokeLinejoin="round"
					strokeLinecap="round"
				></motion.path>
			</motion.svg>
		</motion.div>
		);
}

export default CheckButton;