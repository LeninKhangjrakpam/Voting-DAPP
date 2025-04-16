const Error = ({ errMssg }) => (
	<>
		<h1>This is some error</h1>
		<div>{errMssg || "no err mssg"}</div>
	</>
);

export default Error;
