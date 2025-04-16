import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	redirect,
	Route,
	RouterProvider,
} from "react-router-dom";
import Root from "./Root.jsx";
import Error from "./Error.jsx";
import AuthLayout from "./AuthLayout.jsx";
import HexPage from "./Hexpage.jsx";
import CreateLayout from "./CreateLayout.jsx";
import RegisterLists from "./ResgisterLists.jsx";
import RegisterVoter from "./RegisterVoter.jsx";
import RegisterParty from "./RegisterParty.jsx";
import RegisterCandidate from "./RegisterCandidate.jsx";
import RegisterVoteEvent from "./RegisterVoteEvent.jsx";
import Home from "./Home.jsx";
import Poll from "./Poll.jsx";
import Dashboard from "./Dashboard.jsx";
import Modal from "./Modal.jsx";
import Information from "./Information.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Root />}
			// errorElement={<Error errMssg={"BAD PATH"} />}
		>
			<Route path="*" element={<Error errMssg={"BAD PATH"} />} />
			{/* <Route path="" element={<Home />} /> */}
			<Route path="" element={<Navigate to="/home" replace />} />
			<Route path="home" element={<>DVote Home Page2</>} />
			<Route path="register" element={<CreateLayout />}>
				<Route path="" element={<RegisterLists />} />
				<Route path="voter" element={<RegisterVoter />} />
				<Route path="vote" element={<RegisterVoteEvent />} />
				<Route path="candidate" element={<RegisterCandidate />} />
				<Route path="party" element={<RegisterParty />} />
			</Route>
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="poll" element={<Poll />} />
			<Route path="about" element={<Information />} />
			<Route path="hex" element={<HexPage />} />
			<Route element={<AuthLayout />}>
				<Route path="login" element={<>Aha login page</>} />
				<Route path="register" element={<>Register new User</>} />
			</Route>
		</Route>,
	),
);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* <App /> */}
		<RouterProvider router={router} />
	</React.StrictMode>,
);
