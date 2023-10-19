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

  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const [subserviceList, setSubServiceList] = useState([
    [{ service1: "", service2: "" }],
  ]);

  const handleFormChange = (index, event) => {
    let values = [...serviceList];
    values[index].service = event.target.value;
    setServiceList(values);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
    setSubServiceList([...subserviceList, []]);
  };
  const handleRemoveService = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleSubServiceAdd = (index) => {
    const subservices = [...subserviceList];
    subservices[index].push({ service1: "", service2: "" });
    setSubServiceList(subservices);
  };

  const handleRemoveSubService = (index, subIndex) => {
    const subservices = [...subserviceList];
    subservices[index].splice(subIndex, 1);
    setSubServiceList(subservices);
  };
  const handleSubServiceChange = (index, subIndex, field, value) => {
    const subservices = [...subserviceList];
    subservices[index][subIndex][field] = value;
    setSubServiceList(subservices);
  };

  const [fulldata, setFulldata] = useState({});

  function allservicesData() {
    const data = {};
    for (const item of serviceList) {
      data[item.service] = 
        subServiceData()
    }
    return data;
  }

  function subServiceData() {
    const data = {};
    subserviceList.map((item, index) => {
      // console.log(item[index+1].service1)
      // item[index].service1 = item[index].service2;
      if (item.length > 1){
        data[item[index+1].service1] = item[index+1].service2;
      }
    });
    return data;
  }

  const d = {
    project_name: project,
          milestone: milestone,
          start_date: startDate,
          investigation_date: investigationDate,
          wbs_date: wbsDate,
          release_date: releaseDate,
          data: allservicesData(),
  }
 console.log(d);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "report_config"), {
        project_name: project,
        milestone: milestone,
        start_date: startDate,
        investigation_date: investigationDate,
        wbs_date: wbsDate,
        release_date: releaseDate,
        data: allservicesData(),
      });
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
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
                        {serviceList.map((serviceNameInput, index) => (
                          <tr key={index}>
                            <td className="w-100">
                              <input
                                type="text"
                                name="serviceName"
                                className="form-control form-control-sm"
                                value={serviceNameInput.service}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                              <button
                                className="btn btn-sm text-info"
                                type="button"
                                onClick={() => handleSubServiceAdd(index)}
                              >
                                <u>
                                  <i>
                                    <b>Add Sub Category</b>
                                  </i>
                                </u>
                              </button>
                              <table>
                                <tbody>
                                  {subserviceList[index].map(
                                    (subservice, subIndex) => (
                                      <tr key={subIndex}>
                                        {subIndex > 0 && (
                                          <>
                                            <td className="w-50">
                                              <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                onChange={(e) =>
                                                  handleSubServiceChange(
                                                    index,
                                                    subIndex,
                                                    "service1",
                                                    e.target.value
                                                  )
                                                }
                                                value={subservice.service1}
                                              />
                                            </td>
                                            <td className="w-50">
                                              <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                onChange={(e) =>
                                                  handleSubServiceChange(
                                                    index,
                                                    subIndex,
                                                    "service2",
                                                    e.target.value
                                                  )
                                                }
                                                value={subservice.service2}
                                              />
                                            </td>
                                            <td>
                                              <button
                                                className="btn btn-danger btn-sm"
                                                type="button"
                                                onClick={() =>
                                                  handleRemoveSubService(
                                                    index,
                                                    subIndex
                                                  )
                                                }
                                              >
                                                <FaTimes />
                                              </button>
                                            </td>
                                          </>
                                        )}
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </td>
                            <td>
                              {index > 0 ? (
                                <button
                                  className="btn btn-danger btn-sm"
                                  type="button"
                                  onClick={() => handleRemoveService(index)}
                                >
                                  <FaTimes />
                                </button>
                              ) : (
                                <button
                                  className="btn btn-success btn-sm"
                                  type="button"
                                  onClick={handleServiceAdd}
                                >
                                  <FaPlus />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {/* <ServiceList/> */}
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center"> 
          {/* <button className="btn btn-outline-primary shadow w-50 mt-5 mb-5" type="submit" onClick={handleSubmit}>Submit</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportConfig;
