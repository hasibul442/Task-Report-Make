import React from 'react'
import { FaDownload, FaMinus, FaPen, FaTimes, FaWindowMaximize } from 'react-icons/fa'
import './style.css';
function AppBar({ fileName }) {
	return (
		<>
			<div className="appbar d-flex align-items-center justify-content-between px-3">
				<div className="d-flex align-items-center gap-2">
					<img
						src="/logo.svg"
						alt="Logo"
						width="20"
						height="20"
						className="me-2"
					/>
					<span className="text-white small fw-bold">My VSCode App</span>
				</div>

				{/* Center - Filename (optional) */}
				<div className="text-white small d-none d-md-block">
					{fileName}
				</div>

				{/* Right - Window Controls */}
				<div className="d-flex align-items-center gap-2 text-white-50">
					<button className="btn text-white text-decoration-none">
						<FaPen className="icon-hover" />
					</button>
					<button className="btn text-white text-decoration-none">
						<FaDownload className="icon-hover" />
					</button>
					<a href="/notes" className="btn text-white text-decoration-none">
						<FaTimes className="icon-hover" />
					</a>
				</div>
			</div>
		</>
	)
}

export default AppBar