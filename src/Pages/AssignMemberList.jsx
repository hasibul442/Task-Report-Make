import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function AssignMemberList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [assingmember, setAssingMember] = useState([]);

  const getDataFromDb = async () => {
    const assingInfoquerySnapshot = await getDocs(
      collection(db, "assignmembers")
    );

    const assingInfo = assingInfoquerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAssingMember(assingInfo);
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
  );
}

export default AssignMemberList;
