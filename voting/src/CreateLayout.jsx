import { Outlet } from "react-router-dom";
import "./FormLayout.css";

const CreateLayout = () => {
	return (
		<div style={{ padding: "1rem", margin: "1rem" }}>
			<Outlet />
		</div>
	);
};

export default CreateLayout;
