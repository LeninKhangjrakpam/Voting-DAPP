import { useState } from "react";
import "./Modal.css";
const Modal = ({ contents, handler, msg }) => {
	const [msgViz, setMsgViz] = useState(true);
	return (
		<div className="modal-container">
			{msgViz && msg && (
				<div className="msg">
					Message: {msg} <span onClick={() => setMsgViz(false)}>✖️ </span>
				</div>
			)}

			<div className="modal">
				<div className="close-btn" onClick={handler.closeBtnHandler}>
					❌
				</div>
				<h1 className="modal-title">{contents.title}</h1>
				<div className="modal-body">{contents.body}</div>
			</div>
		</div>
	);
};

export default Modal;
