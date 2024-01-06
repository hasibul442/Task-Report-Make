import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Auto() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [empdata, setEmpdata] = useState([]);
  const [totalTaskCount, setTotalTaskCount] = useState(0);
  const [name, setName] = useState([]);
  const [date, setDate] = useState("");
  const [assingmember, setAssingMember] = useState([]);
  const [member, setMember] = useState([]);
  const [proj, setProj] = useState("");

  const getEmployee = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "employees"), orderBy("name", "asc"))
    );
    const empdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmpdata(empdata);

  };

  const getAssignMember = async () => {
    const assingInfoquerySnapshot = await getDocs(
      collection(db, "assignmembers")
    );
    const assingInfo = assingInfoquerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAssingMember(assingInfo);
    // assignMember(assingInfo);
  };

  // if setAssingMember has data then set name

  // function assignMember(assingInfo) {
  //   if (assingInfo.length > 0) {
  //     const names = assingInfo.map((data) => data.projectName);
  //     setProject(names);
  //   }
  // }

  useEffect(() => {
    getEmployee();
    getAssignMember();
  }, []);

  const readCSVFile = () => {
    let count = 0;
    let totalTaskCount = 0;
    const files = document.querySelector("#file").files;
    let tempdate = date.split("-");
    const formattedDate = tempdate[1] + "/" + tempdate[2];

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function (event) {
        const csvdata = event.target.result;
        const rowData = csvdata.split("\n");

        let empNames = name;

        let fullUpdatedTaskHtml = "";
        let empName = "";

        for (let emp = 0; emp < empNames.length; emp++) {
          let updatedTaskHtml = "";
          count = 0;
          empName = empNames[emp];
          for (let row = 1; row < rowData.length; row++) {
            const rowColData = rowData[row].split(",");

            for (let col = 0; col < rowColData.length; col++) {
              if (
                rowColData[col] === empName &&
                rowColData[col + 1] === formattedDate
              ) {
                count = count + 1;
                updatedTaskHtml += `<li>${rowColData[col - 1].replace("└", "")}
                <ul>
                  <li>Backlog Ticket: N/A</li>
                  <li>Estimated total hours: <span id="man-hour" value=${
                    rowColData[col + 3]
                  }>
                  ${rowColData[col + 3]}</span>
                  </li>
                  <li>Previously done: 0%</li>
                  <li>Today will be done: 100%</li>
                  <li>Today's progress: -</li>
                  <li>Actual hours: -</li>
                </ul>
                </li>`;
              }
            }
          }
          totalTaskCount += count;
          fullUpdatedTaskHtml += `
            <h6 classname="p-0 m-0">
              @${empName} <b>(Total Tasks: ${count})</b>
            </h6>
            <ol>`;
          fullUpdatedTaskHtml += updatedTaskHtml;
          fullUpdatedTaskHtml += "</ol>";
        }
        setTotalTaskCount(totalTaskCount);

        document.querySelector("#taskDetails_1").innerHTML =
          fullUpdatedTaskHtml;
      };
    } else {
      alert("Please select a file.");
    }

    // setName("");
  };

  return (
    <>
      <section className="container mt-5">
        <div className="row">
          <div className="col-sm-6">
            <form action="">
              <div className="mb-3">
                <label htmlFor="project" className="form-label">
                  Project Name
                </label>
                <select
                  className="form-select"
                  name="project"
                  id="project"
                  value={proj}
                  onChange={(e) => {
                    setProj(e.target.value);
                    const filtered = assingmember.filter(
                      (member) => member.projectName === e.target.value
                    );
                    setMember(filtered);
                  }}
                >
                  <option value="">Select Project</option>
                  {assingmember.map((data, item) => (
                    <option value={data.projectName} key={item}>
                      {data.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <h6 htmlFor="" className="">
                  Employee Name
                </h6>
                {member.map((data, item) =>
                  <div key={item}>
                    {data.members.map((member) => (
                    <div key={member.id} className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`employee-${member.id}`}
                        value={member.name}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setName((prev) => [...prev, e.target.value]);
                          } else {
                            setName((prev) =>
                              prev.filter((name) => name !== e.target.value)
                            );
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`employee-${member.id}`}
                      >
                        {member.name}
                      </label>
                    </div>
                  ))}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="taskname" className="form-label">
                  Task Name
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hour" className="form-label">
                  WBS File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  name="file"
                  accept=".csv"
                  // onChange={(e)=> setHour(e.target.value)}
                  // value={hour}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={readCSVFile}
              >
                Submit
              </button>
            </form>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h2>Task Details</h2>
                <h6>
                  Team {proj}: <b>(Total Tasks: {totalTaskCount})</b>
                </h6>
                <p></p>
                <span id="taskDetails_1" className="taskDetails_1"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Auto;
