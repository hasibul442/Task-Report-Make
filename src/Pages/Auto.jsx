import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

function Auto() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [empdata, setEmpdata] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [taskHtml, setTaskHtml] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const getEmployee = async () => {
    const querySnapshot = await getDocs(
      collection(db, "employees"),
      orderBy("create_at", "desc")
    );
    const empdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmpdata(empdata);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const readCSVFile = () => {
    let count = 0;
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

        let updatedTaskHtml = "";

        for (let row = 1; row < rowData.length; row++) {
          const rowColData = rowData[row].split(",");

          for (let col = 0; col < rowColData.length; col++) {
            
            if (
              rowColData[col] === name &&
              rowColData[col + 1] === formattedDate
            ) {
              count = count+1;
              updatedTaskHtml += `<li>${rowColData[col - 1].replace(
                "└",
                ""
              )}
              <ul>
              <li>Backlog Ticket: N/A</li>
              <li>Estimated total hours: <span id="man-hour" value=${rowColData[col + 3]}>
              ${rowColData[col + 3]}</span>
              </li>
              <li>Previously done: 0%</li>
              <li>Today will be done: 100%</li>
              <li>Today's progress: -</li>
              <li>Actual hours: -</ul></li>`;
            }
          }
        }
        setTaskCount(count);
        setTaskHtml(updatedTaskHtml);
        document.querySelector("#taskDetails_1").innerHTML = updatedTaskHtml;
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
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Employee Name
                </label>
                <select
                  name="name"
                  id="name"
                  value={name}
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                >
                  <option value="">Select Employee</option>
                  {empdata.map((data) => (
                    <option value={data.name} key={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
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
                  @{name} (Total Tasks: {taskCount})
                </h6>
                <p>
                  
                </p>
                <ol id="taskDetails_1" className="taskDetails_1"></ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Auto;
