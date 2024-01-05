import React, { useEffect, useState } from "react";
import ButtonGroups from "../Components/ButtonGroups";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { FaTrash } from "react-icons/fa";

function AssignMember() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState([]);
  const [empdata, setEmpdata] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState("");
  const [assingmember, setAssingMember] = useState([]);

  const getDataFromDb = async () => {
    const membersData = await getDocs(
      query(collection(db, "employees"), orderBy("name", "asc"))
    );
    const empdata = membersData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmpdata(empdata);

    const projectData = await getDocs(
      query(collection(db, "projects"), orderBy("name", "asc"))
    );
    const projData = projectData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjectList(projData);

    const assingInfoquerySnapshot = await getDocs(
      collection(db, "assignmembers")
    );

    const assingInfo = assingInfoquerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAssingMember(assingInfo);
  };

  const addAssignMember = async (e) => {
    e.preventDefault();
    //Make name array to Json data formate with name, Project Name, and Id and status

    try {
      //if project name is already exist then update the member list
      const projectData = await getDocs(
        query(collection(db, "assignmembers"), orderBy("projectName", "asc"))
      );
      const projData = projectData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      projData.map(async (data) => {
        if (data.projectName === project) {
          await deleteDoc(doc(db, "assignmembers", data.id));
        }
      });

      let nameData = [];
      name.map((data) => {
        nameData.push({
          name: data,
          status: 1,
        });
      });

      await addDoc(collection(db, "assignmembers"), {
        projectName: project,
        members: nameData,
        create_at: new Date(),
      });
      setProject("");
      setEmpdata([]);
      setName([]);
      await getDataFromDb();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getDataFromDb();
  }, []);

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
                  <h4>Assign Member</h4>

                  <div className="row">
                    <div className="col-sm-4">
                      <form action="">
                        <div className="mb-3">
                          <label htmlFor="project" className="form-label">
                            Project Name
                          </label>
                          <select
                            className="form-select"
                            name="project"
                            id="project"
                            value={project}
                            onChange={(e) => {
                              setProject(e.target.value);
                            }}
                          >
                            <option value="">Select Project</option>
                            {projectList.map((data) => (
                              <option value={data.name} key={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-3">
                          <h6>Employees</h6>
                          {empdata.map((data) => (
                            <div
                              key={data.id}
                              className="form-check form-switch"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`employee-${data.id}`}
                                value={data.name}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setName((prev) => [
                                      ...prev,
                                      e.target.value,
                                    ]);
                                  } else {
                                    setName((prev) =>
                                      prev.filter(
                                        (name) => name !== e.target.value
                                      )
                                    );
                                  }
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`employee-${data.id}`}
                              >
                                {data.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="btn-container mt-3">
                          <button
                            type="submit"
                            className="btn btn-outline-success"
                            onClick={addAssignMember}
                          >
                            Assign Member
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="col-sm-8">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Project Name</th>
                            <th>Member List</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assingmember.map((data) => (
                            <tr key={data.id}>
                              <td>{data.projectName}</td>
                              <td>
                                {data.members.map((member, index) => (
                                  <span
                                    key={index}
                                    className="badge bg-success me-1"
                                  >
                                    {member.name}
                                  </span>
                                ))}
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={async () => {
                                    await deleteDoc(
                                      doc(db, "assignmembers", data.id)
                                    );
                                    await getDataFromDb();
                                  }}
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
    </>
  );
}

export default AssignMember;
