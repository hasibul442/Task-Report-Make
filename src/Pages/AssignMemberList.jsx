import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaTrash } from "react-icons/fa";

function AssignMemberList() {
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
        <div className="container">
        <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Member List</th>
                            <th>Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assingmember.map((data, item) => (
                            <tr key={data.id}>
                              <td>{++item}</td>
                              <td>{data.projectName}</td>
                              <td>
                              <ul>
                                {data.members.map((member, index) => (
                                  <li key={index}>{member.name}</li>
                                ))}

                                </ul>
                              </td>
                              <td>
                              <span className="badge bg-success me-1">
                                    {data.members.length}
                                  </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
        </div>
      </div>
    </>
  )
}

export default AssignMemberList