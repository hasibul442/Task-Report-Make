import React, { useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function PercentageCalculation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [totalTask, setTotalTask] = useState();
  const [totalComplete, setTotalComplete] = useState();
  const [open, setOpen] = useState();
  const [inProgress, setInProgress] = useState();
  const [resolved, setResolved] = useState();
  const [percentage, setPercentage] = useState();


  const calculatePercentage = () => {
    let total = parseInt(totalTask);
    let complete = parseInt(totalComplete);
    // let open = total - complete;
    // let inProgress = complete - resolved;
    // let resolved = complete - inProgress;

    // setOpen(open);
    // setInProgress(inProgress);
    // setResolved(resolved);
    setPercentage(((complete / total) * 100).toFixed(2));
  }
  return (
    <>
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="card shadow border-0">
                <div className="card-body">
                  <form action="">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Total Task
                      </label>
                      <input type="number" min={0} className="form-control" 
                        name="total_task" id="total_task"
                        value={totalTask}
                        onChange={(e) => setTotalTask(e.target.value)}
                      />
                      
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Completed Task
                      </label>
                      <input type="number" min={0} className="form-control" 
                        name="total_completed" id="total_completed"
                        value={totalComplete}
                        onChange={(e) => setTotalComplete(e.target.value)}
                      />
                      
                    </div>

                    <button
                type="button"
                className="btn btn-primary"
                onClick={calculatePercentage}
              >
                Submit
              </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-sm-8">
              <div className="card">
                <div className="card-body">
                  <h6>Progress Rate : {percentage}%</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PercentageCalculation;
