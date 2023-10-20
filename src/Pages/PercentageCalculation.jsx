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
      
      // const [isOnline, setIsOnline] = useState(navigator.onLine);

      // useEffect(() => {
      //   function onlineHandler() {
      //     checkInternetConnectivity().then((isConnected) => {
      //       setIsOnline(isConnected);
      //       console.log("Internet connectivity: " + isConnected);
      //     });
      //   }
    
      //   function offlineHandler() {
      //       setIsOnline(false);
      //   }
    
      //   window.addEventListener("online", onlineHandler);
      //   window.addEventListener("offline", offlineHandler);
  
    
      //   return () => {
      //       window.removeEventListener("online", onlineHandler);
      //       window.removeEventListener("offline", offlineHandler);
      //   };
      // }, []);

      // async function checkInternetConnectivity() {
      //   try {
      //     console.log("Checking internet connectivity...");
      //     const response = await fetch("https://www.google.com", { mode: "no-cors" });
      //     return response.status >= 200 && response.status < 300;
      //   } catch (error) {
      //     return false;
      //   }
      // }

      const [status, setStatus] = useState(() => {
        if (navigator.onLine) {
          console.log("Connected to network.");
          return true;
        } else {
          return false;
        }
      });
    
      useEffect(() => {
        window.ononline = (e) => {
          console.log("Connected to network.");
          setStatus(true);
        };
    
        window.onoffline = (e) => {
          console.log("Network connection lost.");
          setStatus(false);
        };
      }, [status]);
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

      <div className='container mt-5'>
      		{status ? (
        		<p>You are online.</p>
      		) : (
        		<p>You are offline. Please check your internet connection.</p>
      		)}

          <button
            className={`btn btn-primary ${status ? "" : "disabled"}`}
          >
Button Test
          </button>
    	</div>
    </>
  )
}

export default PercentageCalculation