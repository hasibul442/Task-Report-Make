import React, { useEffect, useState } from 'react'
import ButtonGroups from '../Components/ButtonGroups'
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    orderBy,
  } from "firebase/firestore";
  import { db } from "../../firebase";


function ReportConfig() {
    const [projectdata, setProjectdata] = useState([]);
    const [project, setProject] = useState("");


    const getProject = async () => {
        const querySnapshot = await getDocs(
          collection(db, "projects"),
          orderBy("create_at", "desc")
        );
        const projectdata = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjectdata(projectdata);
      };
    
      useEffect(() => {
        getProject();
      }, []);

  return (
    <>
        <div className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <ButtonGroups />
            </div>

            <div className="col-sm-4">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                        <form action="">
                        <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Project Name
                  </label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    onChange={(e) => {
                      setProject(e.target.value);
                    }}
                  >
                    <option value="">Select Project</option>
                    {projectdata.map((data) => (
                      <option value={data.name} key={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                        </form>
                    </div>

                    <div className="col-sm-6">
                      {/* <h5 className="">Project List</h5>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Project Id</th>
                              <th scope="col">Project Name</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {" "}
                            {projectdata.map((project, index) => (
                              <tr key={project.id}>
                                <td>{index + 1}</td>
                                <td>{project.name}</td>
                                <td>
                                  <button
                                    className="btn btn-outline-danger"
                                    onClick={() =>
                                      deleteProject(project.id)
                                    }
                                  >
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            ))}{" "}
                          </tbody>
                        </table>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
                <div className="card shadow border-0">
                    <div className="card-body">
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportConfig