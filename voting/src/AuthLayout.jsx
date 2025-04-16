import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<>
			<h3>Authentication</h3>
			<Outlet />
		</>
	);
};

export default AuthLayout;
