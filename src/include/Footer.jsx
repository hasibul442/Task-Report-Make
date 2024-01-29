import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import packages from "../../package.json";

function Footer() {
  return (
    <div className="container">
      {/* //All copy right reserved */}
      <div className="row">
        <div className="col-sm-6">
          <div className="footer">
            <p>© 2021 All rights reserved</p>
          </div>
        </div>
        <div className="col-sm-6">
          {/* Application Vertion */}
          <div className="text-right" style={{ textAlign:"right" }}>
            <p className="float-right">TMS v{packages.version}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
