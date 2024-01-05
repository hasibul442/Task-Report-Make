import React from 'react'
import { Link } from 'react-router-dom'

function ButtonGroups() {
    const location = window.location.pathname;
  return (
    <>
        <Link className={`btn w-100 mb-3 ${location==="/project" ? "btn-primary" : "btn-outline-primary"}`} to="/project" >Project</Link> <br />
        <Link className={`btn w-100 mb-3 ${location==="/project/member/assign" ? "btn-primary" : "btn-outline-primary"}`} to="/project/member/assign" >Member Assign</Link> <br />
        <Link className={`btn w-100 mb-3 ${location==="/report_config" ? "btn-primary" : "btn-outline-primary"}`} to="/report_config" >Report Config</Link> <br />
        <Link className={`btn w-100 mb-3 ${location==="/report_list" ? "btn-primary" : "btn-outline-primary"}`} to="/report_list" >Report List</Link> <br />
        {/* <Link className="btn btn-primary mb-3" to="/project" >Milstone</Link> <br />
        <Link className="btn btn-primary mb-3" to="/project" >Sub Category</Link> <br />
        <Link className="btn btn-primary mb-3" to="/project" >Project</Link> <br />
        <Link className="btn btn-primary mb-3" to="/project" >Project</Link> <br />
        <Link className="btn btn-primary mb-3" to="/project" >Project</Link> <br />
        <Link className="btn btn-primary mb-3" to="/project" >Project</Link> <br />
        <Link className="btn btn-primary mb-3" to="/project" >Project</Link> <br /> */}
    </>
  )
}

export default ButtonGroups