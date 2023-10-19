import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

function ServiceList() {

    const [serviceList, setServiceList] = useState([
        {service :''}
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
                                 <b>Add Sub Category</b>
                               </i>
                             </u>
                           </button>
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