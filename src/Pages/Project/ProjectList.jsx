import React, { useEffect, useState } from "react";
import ButtonGroups from "../Components/ButtonGroups";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { FaTrash } from "react-icons/fa";

function ProjectList() {
  const [project, setProject] = useState("");
  const [projectdata, setProjectdata] = useState([]);
  let project_id;

  const handleInputChange = (e) => {
    setProject(e.target.value);
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), {
        name: project,
        create_at: new Date(),
      });
      setProject("");
      await getProject();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getProject = async () => {
    const querySnapshot = await getDocs(
      collection(db, "projects"),
      orderBy("create_at", "desc")
    );
    const projectdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    project_id = projectdata.length;
    setProjectdata(projectdata);
  };

  useEffect(() => {
    getProject();
  }, []);

  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      await getProject();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }
  return (
    <>
      <div className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <ButtonGroups />
            </div>

            <div className="col-sm-10">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5 className="">Project Add</h5>
                      <div className="">
                        <input
                          type="text"
                          className="form-control w-75"
                          placeholder="Enter Project Name"
                          value={project}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="btn-container mt-3">
                        <button
                          type="submit"
                          className="btn btn-outline-success"
                          onClick={addProject}
                        >
                          Add Project
                        </button>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <h5 className="">Project List</h5>
                      <div className="">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Project Id</th>
                              <th scope="col">Project Name</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
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
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
