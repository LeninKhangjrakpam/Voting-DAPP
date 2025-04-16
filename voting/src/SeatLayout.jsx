import { useContext } from "react";
import "./seatLayout.css";
import { SeatSelectContext, SelectedSeatContext } from "./seatSelectContext";

const SeatLayout = ({ seatInfo, setSeatInfo }) => {
	const [selectSeat, setSelectSeat] = useContext(SeatSelectContext);
	const [selectedSeat, setSelectedSeat] = useContext(SelectedSeatContext);

	const handleSeatClick = (e) => {
		const row = +e.target.getAttribute("data-row"),
			col = +e.target.getAttribute("data-col");

		let seatMatrix = [...seatInfo.seatMatrix];
		seatMatrix[row][col] = seatMatrix[row][col] === 0 ? 1 : 0;

		setSeatInfo((info) => ({
			...info,
			seatMatrix,
		}));
		setSelectedSeat((s) => [...s, { row, col }]);
	};

	const handleMouseOver = (e) => {
		const row = +e.target.getAttribute("data-row"),
			col = +e.target.getAttribute("data-col");
		setSelectSeat({ row, col });
	};

	return (
		<>
			<h1>Array Mutation</h1>
			{seatInfo.seatMatrix.map((row, ri) => {
				return (
					<div key={ri}>
						{row.map((elm, ei) => (
							<div
								key={ei}
								className="seat"
								data-row={ri}
								data-col={ei}
								style={{
									backgroundColor: elm === 1 ? "salmon" : "transparent",
								}}
								onMouseEnter={handleMouseOver}
								onClick={handleSeatClick}></div>
						))}
					</div>
				);
			})}
		</>
	);
};

export default SeatLayout;
