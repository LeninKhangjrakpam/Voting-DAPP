const convertToHallSeat = (row, col) => {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const seat = `${charset[row % charset.length]}${col + 1}`;
	return seat;
};

const bigintToNum = (d) =>
	d.map((e) => {
		Object.keys(e).forEach((key) => {
			e[key] = typeof e[key] === "bigint" ? Number(e[key]) : e[key];
		});
		return e;
	});

const humanizer = (snakeCase) => {
	if (snakeCase.length === 0) return "";
	let r = snakeCase[0].toUpperCase();
	for (let i = 1; i < snakeCase.length; i++) {
		r += `${snakeCase[i] === snakeCase[i].toUpperCase() ? " " : ""}${
			snakeCase[i]
		}`;
	}
	return r;
};

export { convertToHallSeat, bigintToNum, humanizer };
