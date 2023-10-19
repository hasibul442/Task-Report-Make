import React, { useEffect } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy
} from "firebase/firestore";
import {db} from "../firebase";
import { useState } from 'react';


function PercentageCalculation() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const [projectdata, setProjectdata] = useState([]);
      const getProjectReportData = async () => {
        const querySnapshot = await getDocs(
          collection(db, "report_config")
        );
        const projectdata = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjectdata(projectdata);
      }
      
  return (
    <>
      <section className='mt-5'>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="card shadow border-0">
                <div className="card-body">


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PercentageCalculation