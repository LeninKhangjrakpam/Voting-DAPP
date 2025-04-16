import { useState } from "react";
import SeatControl from "./SeatControl";
import SeatLayout from "./SeatLayout";
import { SeatSelectContext, SelectedSeatContext } from "./seatSelectContext";
import { convertToHallSeat } from "./util";

const Seat = () => {
	const [selectSeat, setSelectSeat] = useState(null);
	const [selectedSeat, setSelectedSeat] = useState([]);

	const [seatInfo, setSeatInfo] = useState({
		row: 10,
		col: 10,
		seatMatrix: Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => 0),
		),
	});

	return (
		<SeatSelectContext.Provider value={[selectSeat, setSelectSeat]}>
			<SelectedSeatContext.Provider value={[selectedSeat, setSelectedSeat]}>
				<h1>Array Mutation</h1>
				<SeatControl seatInfo={seatInfo} setSeatInfo={setSeatInfo} />
				<SeatLayout seatInfo={seatInfo} setSeatInfo={setSeatInfo} />
				<h1>Seat Matrix data</h1>
				<b>{JSON.stringify(seatInfo.seatMatrix)}</b>
				<h2>Selected Seat Lists</h2>
				<div>
					{selectedSeat.length !== 0 &&
						selectedSeat.map((d, i) => (
							<span
								style={{
									display: "inline-block",
									margin: "0.4rem",
									border: "1px solid grey",
									padding: "0.8rem",
									fontSize: "1.4rem",
									fontWeight: "bold",
									borderRadius: "0.4rem",
								}}
								key={i}>
								{convertToHallSeat(d.row, d.col)}
							</span>
						))}
				</div>
			</SelectedSeatContext.Provider>
		</SeatSelectContext.Provider>
	);
};

export default Seat;
