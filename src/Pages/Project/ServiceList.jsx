import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

function ServiceList() {
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

  // const [fulldata, setFulldata] = useState([]);
  // //make data formate for firebase
  // useEffect(() => {
  //     const data = serviceList.map((item) => {
  //         return {
  //             "project_name": "project_name",
  //         };
  //     });
  //     setFulldata(data);
  // }, [serviceList]);

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

  const handleSubServiceChange = (index, field, value) => {
    const sublist = [...subserviceList];
    sublist[index][field] = value;
    setSubServiceList(sublist);
  };

  // console.log(fulldata);
  return (
    <>
      {serviceList.map((serviceNameInput, index) => (
        <tr key={index}>
          <td className="w-100">
            <input
              type="text"
              name="serviceName"
              className="form-control form-control-sm"
              value={serviceNameInput.service}
              // onChange={(event) => handleFormChange(index, event.target.value)}
              onChange={(event) => handleFormChange(index, event)}
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
                {subserviceList[index].map((subservice, subIndex) => (
                  <tr key={subIndex}>
                 { subIndex > 0 && 
                    (<>
                    <td className="w-50">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        handleSubServiceChange(
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
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemoveSubService(index, subIndex)}
                    >
                      <FaTimes />
                    </button>
                  </td>
                    </>)
                    
                  }
                </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td>
            {index > 0 ? (
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleRemoveService(index)}
              >
                <FaTimes />
              </button>
            ) : (
              <button
                className="btn btn-success"
                type="button"
                onClick={handleServiceAdd}
              >
                <FaPlus />
              </button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}

export default ServiceList;
