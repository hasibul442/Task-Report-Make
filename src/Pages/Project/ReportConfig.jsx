import React, { useEffect, useState } from "react";
import ButtonGroups from "../Components/ButtonGroups";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { FaCross, FaPlus, FaTimes } from "react-icons/fa";
import ServiceList from "./ServiceList";

function ReportConfig() {
  const [projectdata, setProjectdata] = useState([]);
  const [project, setProject] = useState("");
  const [milestone, setMilestone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [investigationDate, setInvestigationDate] = useState("");
  const [wbsDate, setWbsDate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const getProject = async () => {
    const querySnapshot = await getDocs(
      collection(db, "projects"),
      orderBy("create_at", "desc")
    );
    const projectdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjectdata(projectdata);
  };

  useEffect(() => {
    getProject();
  }, []);

  const [numSubCategories, setNumSubCategories] = useState(0);

  const handleAddSubCategory = () => {
    setNumSubCategories(numSubCategories + 1);
  };

  const handleRemoveSubCategory = (event) => {
    event.preventDefault();
    const row = event.target.closest('.subcatblock');
    if (row) {
      row.remove();
      setNumSubCategories(numSubCategories - 1);

    }
    setNumSubCategories(0)
  };




  // console.log(serviceList);
  return (
    <>
      <div className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <ButtonGroups />
            </div>

            <div className="col-sm-5">
              <div className="card shadow border-0">
                <div className="card-body">
                  <form action="">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Project Name
                      </label>
                      <select
                        name=""
                        id=""
                        className="form-control form-control-sm"
                        onChange={(e) => {
                          setProject(e.target.value);
                        }}
                      >
                        <option value="">Select Project</option>
                        {projectdata.map((data) => (
                          <option value={data.name} key={data.id}>
                            {data.name}{" "}
                          </option>
                        ))}{" "}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="milestone" className="form-label">
                        Milestone
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        onChange={(e) => {
                          setMilestone(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="start_date" className="form-label">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="investigation_date"
                        className="form-label"
                      >
                        Investigation Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        onChange={(e) => {
                          setInvestigationDate(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="wbs_Date" className="form-label">
                        WBS Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        onChange={(e) => {
                          setWbsDate(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="release_date" className="form-label">
                        Release Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        onChange={(e) => {
                          setReleaseDate(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="card shadow border-0">
                <div className="card-body">
                  <form action="">
                    <table className="table table-border">
                      <tbody>
                       <ServiceList />
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportConfig;
