import React, { useState } from 'react';

function Manual() {
  const [taskCount, setTaskCount] = useState(0);
  const [totalManHours, setTotalManHours] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [manHour, setManHour] = useState('');
  const [taskDetails, setTaskDetails] = useState([]);

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleManHourChange = (event) => {
    setManHour(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (taskName && manHour) {
      setTaskCount(taskCount + 1);
      setTotalManHours(totalManHours + parseInt(manHour));
      const newTask = {
        taskName: taskName,
        manHour: manHour,
      };
      setTaskDetails([...taskDetails, newTask]);
      setTaskName('');
      setManHour('');
    }
  };

  const handleRemoveTask = (manHour) => {
    setTotalManHours(totalManHours - parseInt(manHour));
    setTaskCount(taskCount - 1);
    setTaskDetails(taskDetails.filter((task) => task.manHour !== manHour));
  };

  const taskList = taskDetails.map((task, index) => (
    <li key={index}>
      {task.taskName}
      <ul className="datalist">
        <li>Backlog Ticket: N/A</li>
        <li className="man">Estimated total hours: {task.manHour}</li>
        <li>Previously done: 0%</li>
        <li>Today will be done: 100%</li>
        <li>Today's progress: -</li>
        <li>Actual hours: -</li>
      </ul>
      <button type="button" className="btn btn-sm btn-danger remove-task" onClick={() => handleRemoveTask(task.manHour)}>
        <i className="fas fa-trash"></i>
      </button>
    </li>
  ));

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <form>
              <div className="mb-3">
                <label htmlFor="taskname" className="form-label">Task Name</label>
                <input type="text" className="form-control" id="taskname" value={taskName} onChange={handleTaskNameChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="manhour" className="form-label">Man Hour</label>
                <input type="text" className="form-control" id="manhour" value={manHour} onChange={handleManHourChange} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleAddTask}>Submit</button>
            </form>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h6>@{emp} <b>(Total Task: {taskCount})</b></h6>
                <ul id="taskDetails">
                  {taskList}
                </ul>
                <p>Total Man Hours: <span className="total-hour">{totalManHours}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manual;