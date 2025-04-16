import "./Hex.css";

const HexPage = () => {
	return (
		<div
			style={{
				// width: "100vw",
				height: "100vh",
				overflow: "hidden",
				border: "2px solid green",
				position: "relative",
			}}>
			<Hexs />
		</div>
	);
};

export default HexPage;

const Hexs = () => {
	const width = 70,
		height = 80;
	const hexHeight = 8,
		hexWidth = 8;
	const col = Math.round(width / hexWidth),
		row = Math.round(height / hexHeight);

	let elms = [];
	let k = 0;
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			elms.push(
				<Hex
					key={++k}
					height={`${hexHeight}rem`}
					width={`${hexWidth}rem`}
					top={`${i * (8 - 1.9) - 2}rem`}
					left={`${i % 2 === 0 ? j * 8.1 - 4 : j * 8.1}rem`}
				/>,
			);
		}
	}

	return <>{elms}</>;
};

const Hex = ({ width, height, top, left }) => {
	const path = `50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%`;

	return (
		<div
			className="hex"
			style={{
				height,
				width,
				top,
				left,
				clipPath: `polygon(${path})`,
			}}></div>
	);
};
