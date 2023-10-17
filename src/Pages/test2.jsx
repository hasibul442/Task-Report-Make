import React, { useState, useEffect } from 'react';
import { getDocs, collection, orderBy } from 'firebase/firestore';
import { db } from './firebase';

function Auto() {
  const [empdata, setEmpdata] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [taskHtml, setTaskHtml] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const readCSVFile = () => {
    const files = document.querySelector('#file').files;

    let tempdate = date.split('-');
    const formattedDate = tempdate[1] + '/' + tempdate[2];

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function (event) {
        const csvdata = event.target.result;
        const rowData = csvdata.split('\n');

        let updatedTaskHtml = ''; // Create a temporary variable

        for (let row = 1; row < rowData.length; row++) {
          const rowColData = rowData[row].split(',');

          for (let col = 0; col < rowColData.length; col++) {
            if (rowColData[col] === name && rowColData[col + 1] === formattedDate) {
              setTaskCount(taskCount + 1);
              updatedTaskHtml +=
                `<li>${rowColData[col - 1].replace(
                  '└',
                  ''
                )}<ul><li>Backlog Ticket: N/A</li><li>Estimated total hours: <span id="man-hour" value=${rowColData[col + 3]}>${rowColData[col + 3]}</span></li><li>Previously done: 0%</li><li>Today will be done: 100%</li><li>Today's progress: -</li><li>Actual hours: -</ul></li>`;

              // Remove the setting of taskHtml from here
            }
          }
        }

        // Set the taskHtml after processing the file
        setTaskHtml(updatedTaskHtml);

        // Rest of your code remains the same
        document.querySelector('#taskDetails_1').innerHTML = updatedTaskHtml;
        document.querySelector('#emp-name').innerHTML = name;
        document.querySelector('.total').innerHTML = taskCount;
      };
    } else {
      alert('Please select a file.');
    }
  };

  const getEmployee = async () => {
    const querySnapshot = await getDocs(
      collection(db, 'employees'),
      orderBy('create_at', 'desc')
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

  return (
    <>
      <section className="container mt-5">
        <div className="row">
          <div className="col-sm-6">
            <form action="">
              <div>
                <label htmlFor="file">Select a CSV file:</label>
                <input type="file" id="file" name="file" accept=".csv" />
              </div>
              <div>
                <label htmlFor="name">Employee Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
              </div>
              <div>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" value={date} onChange={handleDateChange} />
              </div>
              <button type="button" onClick={readCSVFile}>
                Read File
              </button>
            </form>
          </div>
        </div>
      </section>
      <h2>Task Details</h2>
      <p>
        Employee Name: <span id="emp-name"></span>
      </p>
      <p>
        Total Tasks: <span className="total"></span>
      </p>
      <ul id="taskDetails_1"></ul>
      <button id="copy2">Copy to Clipboard</button>
    </>
  );
}

export default Auto;
