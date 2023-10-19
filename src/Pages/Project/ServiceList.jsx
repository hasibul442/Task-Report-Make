import React from 'react'
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

function ServiceList() {

    const [serviceList, setServiceList] = useState([{"service" : ""}]);
    const handleServiceAdd = () => {
      setServiceList([...serviceList, {"service" : ""}]);
    }
    const handleRemoveService = (index) => {
      const list = [...serviceList];
      list.splice(index, 1);
  
      console.log(index);
      setServiceList(list);
    }

  return (
    <>
        {serviceList.map((service, index) => (
                         <tr key={index}>
                         <td className="w-100">
                           <input
                             type="text"
                             className="form-control form-control-sm"
                            //   value={index + 1} readOnly
                            //  onChange={(e) => {
                            //    setMilestone(e.target.value);
                            //  }}
                            
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