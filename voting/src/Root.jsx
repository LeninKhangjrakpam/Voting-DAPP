import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { createContract } from "./Contract";
import ContractContext from "./ContractContext";
import contractDetail from "./ContractDetail";
import "./index.css";
import "./Navbar.css";

const linkStyle = (isActive, isPending, isTransitioning) => ({
	transition: "200ms",
	fontWeight: isActive ? "bold" : "",
	color: isActive ? "salmon" : isTransitioning ? "grey" : "",
});

const Root = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [voteContract, setVoteContract] = useState(null);

	useEffect(() => {
		const { ganacheEndPoint, contractAddr, contractABI } = contractDetail;
		setVoteContract(
			createContract({ ganacheEndPoint, contractAddr, contractABI }),
		);
	}, []);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<div className="navbar-logo">
						<NavLink
							to="/"
							style={({ isActive, isPending, isTransitioning }) =>
								linkStyle(isActive, isPending, isTransitioning)
							}>
							DVote
						</NavLink>
					</div>
					<div className={`navbar-menu${isOpen ? "-active" : ""}`}>
						<ul className="navbar-items">
							<li className="navbar-item home">
								<NavLink
									to="/home"
									style={({ isActive, isPending, isTransitioning }) =>
										linkStyle(isActive, isPending, isTransitioning)
									}>
									Home
								</NavLink>
							</li>
							<li className="navbar-item">
								<NavLink
									to="/dashboard"
									style={({ isActive, isPending, isTransitioning }) =>
										linkStyle(isActive, isPending, isTransitioning)
									}>
									Dashboard
								</NavLink>
							</li>
							<li className="navbar-item">
								<NavLink
									to="/register"
									style={({ isActive, isPending, isTransitioning }) =>
										linkStyle(isActive, isPending, isTransitioning)
									}>
									Register
								</NavLink>
							</li>
							<li className="navbar-item">
								<NavLink
									to="/poll"
									style={({ isActive, isPending, isTransitioning }) =>
										linkStyle(isActive, isPending, isTransitioning)
									}>
									Poll
								</NavLink>
							</li>
							<li className="navbar-item">
								<NavLink
									to="/about"
									style={({ isActive, isPending, isTransitioning }) =>
										linkStyle(isActive, isPending, isTransitioning)
									}>
									Information
								</NavLink>
							</li>
							{/* <li className="navbar-item">
								<NavLink
									to="/hex"
									style={({ isActive, isPending, isTransitioning }) =>
										linkStyle(isActive, isPending, isTransitioning)
									}>
									Hex
								</NavLink>
							</li> */}
						</ul>
					</div>
				</div>
				<div className="navbar-toggle" onClick={() => setIsOpen((d) => !d)}>
					{isOpen ? "❌" : "🟰"}
				</div>
			</nav>
			{/* <div style={{ padding: "1rem", border: "1px solid salmon" }}> */}
			<ContractContext.Provider value={[voteContract, setVoteContract]}>
				<div>
					<Outlet />
				</div>
			</ContractContext.Provider>
		</>
	);
};

export default Root;
