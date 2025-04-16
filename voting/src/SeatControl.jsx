import { useContext } from "react";
import { SeatSelectContext } from "./seatSelectContext";
import { convertToHallSeat } from "./util";

const SeatControl = ({ seatInfo, setSeatInfo }) => {
	const [selectSeat, _] = useContext(SeatSelectContext);

	return (
		<>
			<h1>Seat Management</h1>
			Seat Row:
			<input
				type="number"
				value={seatInfo.row}
				onChange={(e) =>
					setSeatInfo((info) => ({
						...info,
						row: e.target.value,
						seatMatrix: Array.from({ length: e.target.value }, () =>
							Array.from({ length: 10 }, () => 0),
						),
					}))
				}
			/>
			<br />
			Seat Col:
			<input
				type="number"
				value={seatInfo.col}
				onChange={(e) =>
					setSeatInfo((info) => ({
						...info,
						col: e.target.value,
						seatMatrix: Array.from({ length: info.row }, () =>
							Array.from({ length: e.target.value }, () => 0),
						),
					}))
				}
			/>
			<br />
			Select Seat:{" "}
			<b>
				{selectSeat === null
					? "Select Seat"
					: convertToHallSeat(selectSeat.row, selectSeat.col)}
			</b>
		</>
	);
};

export default SeatControl;
