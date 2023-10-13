import React from "react";
import "./navbar.css"
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div className="container">

	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="fa fa-bars"></span> Menu
	      </button>

	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav ml-auto">
	        	<li className="nav-item active"><Link to="/auto-task-report" className="nav-link">Auto Task Report</Link></li>
	        	<li className="nav-item"><Link to="/manual-task-report" className="nav-link">Manual Task Report</Link></li>
	        	<li className="nav-item"><Link to="/task-list-update" className="nav-link">Task List Update</Link></li>
	        	<li className="nav-item"><Link to="/percentage" className="nav-link">Percentage Calculation</Link></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
    </>
  );
}

export default NavBar;
