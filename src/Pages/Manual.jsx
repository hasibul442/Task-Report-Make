import {
  collection,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

import React, { useEffect, useState } from 'react'


function Manual() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const [empdata, setEmpdata] = useState([])

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


      const [task, setTask] = useState("")
      const [hour, setHour] = useState("")
      const [emp, setEmp] = useState("")
      const [total, setTotal] = useState(0)

      //Add Task will be added to the just an arry
      const [tasks, setTasks] = useState([])
      const addTask = (e) => {
        e.preventDefault()
        setTasks([...tasks, {task: task, hour: hour}])
      }

      
      
  return (
    <>
        <div className="container">
          <div className='mt-5'>
            <div className="row">
              <div className="col-sm-6">
                <form action="">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Employee Name</label>
                    <select name="" id="" className="form-control" onChange={(e) => {setEmp(e.target.value)}
                    }>
                      <option value="">Select Employee</option>
                      {empdata.map((data) => (
                        <option value={data.name} key={data.id}>{data.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="taskname" className="form-label">Task Name</label>
                    <input type="text" className="form-control"  onChange={(e) => {setTask(e.target.value)}}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="hour" className="form-label">Est. Hour</label>
                    <input type="text" className="form-control" id="hour" onChange={(e) => {setHour(e.target.value)}}/>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={addTask}>Submit</button>
                </form>
              </div>

              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h6>@{emp} <b>(Total Task: {total})</b></h6>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Manual