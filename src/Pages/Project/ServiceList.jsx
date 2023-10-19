import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

function ServiceList() {

    const [serviceList, setServiceList] = useState([
        {service :''}
    ]);
    const [subserviceList, setSubServiceList] = useState([
        {service1 :'', service2: ''}
    ]);
   

    const handleFormChange= (index, event) => {
        // console.log(event);
        let values = [...serviceList];
        // console.log(values[index]);
        values[index].service = event.target.value;
        setServiceList(values);
    };


    
    const handleServiceAdd = () => {
        setServiceList([...serviceList, {service :''}]);
      }
    const handleRemoveService = (index) => {
      const list = [...serviceList];
      list.splice(index, 1);
  
    //   console.log(index);
      setServiceList(list);
    }

    const [fulldata, setFulldata] = useState([]);
    //make data formate for firebase
    useEffect(() => {
        const data = serviceList.map((item) => {
            return {
                "project_name": "project_name",
            };
        });
        setFulldata(data);
    }, [serviceList]);

    const handleSubServiceAdd = () => {
      setSubServiceList([...subserviceList, {  service1: "" , service2: ""}]);
    };
  
    const handleRemoveSubService = (remove_index) => {
      const sublist = [...subserviceList];
      sublist.splice(remove_index, 1);
      setServiceList(sublist);
    };
  
    const handleSubServiceChange = (index, value) => {
      const sublist = [...subserviceList];
      sublist[index].service1 = value;
      sublist[index].service2 = value;
      setServiceList(sublist);
    };


    console.log(fulldata);
  return (
    <>
        {serviceList.map((serviceNameInput, index) => (
                         <tr key={index}>
                         <td className="w-100">
                           <input
                             type="text"
                             name='serviceName'
                             className="form-control form-control-sm"
                            value={serviceNameInput.service}
                            // onChange={(event) => handleFormChange(index, event.target.value)}
                            onChange={event => handleFormChange(index, event)}
                            
                           />
                           <button
                             className="btn btn-sm text-info"
                             type="button"
                            //  onClick={handleAddSubCategory}
                           >
                             <u>
                               <i>
                                 <b onClick={handleSubServiceAdd}>Add Sub Category</b>
                               </i>
                             </u>
                           </button>
                           {subserviceList.map((index, index1) => (
                            <tr key={index1}>
                              <td className="w-50">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  onChange={handleSubServiceChange}
                                  // value={service1.service1}
                                />
                              </td>
                              <td className="w-50">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  onChange={handleSubServiceChange}
                                  // value={service1.service2}
                                />
                              </td>
                              <td>
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => handleRemoveSubService(index1)}
                                  >
                                    <FaTimes />
                                  </button>
                              </td>
                            </tr>
                          ))}
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
                            ):(
                              <button
                              className="btn btn-success"
                              type="button"
                              onClick={handleServiceAdd}
                            >
                              <FaPlus />
                            </button>  
                            )
                          }
                         </td>
                       </tr>  
                       ))}
    </>
  )
}

export default ServiceList