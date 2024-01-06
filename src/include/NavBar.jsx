import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
function NavBar({ isVisible }) {
  const location = useLocation();
  const auth = getAuth();
  const isUserLoggedIn = auth.currentUser;
  if (!isVisible) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span> Menu
          </button>

          <div>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle 
					${location.pathname === "/" ? "active" : ""}
					${location.pathname === "/auto-task-report" ? "active" : ""} 
					${location.pathname === "/manual-task-report" ? "active" : ""} 
					${location.pathname === "/total-task-report" ? "active" : ""} 
					${location.pathname === "/task-list-update" ? "active" : ""} 

					`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Report
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/auto-task-report">
                        Auto Task Report
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/manual-task-report">
                        Manual Task Report
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/total-task-report">
                        Total Task Report
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/task-list-update">
                        Task List Update
                      </Link>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="nav-item">
                  <Link
                    to="/auto-task-report"
                    className={`nav-link ${
                      location.pathname === "/auto-task-report" ? "active" : ""
                    } ${location.pathname === "/" ? "active" : ""}`}
                  >
                    Home
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    to="/auto-task-report"
                    className={`nav-link ${
                      location.pathname === "/auto-task-report" ? "active" : ""
                    } ${location.pathname === "/" ? "active" : ""}`}
                  >
                    Auto Task <br />Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/manual-task-report"
                    className={`nav-link ${
                      location.pathname === "/manual-task-report"
                        ? "active"
                        : ""
                    }`}
                  >
                    Manual Task <br />Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/total-task-report"
                    className={`nav-link ${
                      location.pathname === "/total-task-report" ? "active" : ""
                    }`}
                  >
                    Total Task<br />Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/task-list-update"
                    className={`nav-link ${
                      location.pathname === "/task-list-update" ? "active" : ""
                    }`}
                  >
                    Task List<br /> Update
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/percentage"
                    className={`nav-link ${
                      location.pathname === "/percentage" ? "active" : ""
                    }`}
                  >
                    Percentage <br /> Calculation
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/assign/Member/list"
                    className={`nav-link ${
                      location.pathname === "/assign/Member/list" ? "active" : ""
                    }`}
                  >
                    Assign <br /> Member List
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/project"
                    className={`nav-link ${
                      location.pathname === "/project" ? "active" : ""
                    }`}
                  >
                    Project <br /> Information
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                {!isUserLoggedIn ? (
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className={`nav-link ${
                        location.pathname === "/login" ? "active" : ""
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <button onClick={handleLogout} className={`nav-link`}>
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
