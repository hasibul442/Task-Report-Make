import React, { useEffect, useState } from 'react'


function Manual() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const [empdata, setEmpdata] = useState([])

    //   fetch('https://raw.githubusercontent.com/hasibul442/Task-Report-Make/main/employee.json/employee.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         setEmpdata(data)
    //     });

    //     console.log(empdata);

    // const apiKey = ;
    // console.log(apiKey);
  return (
    <>
        <div className="container">
            {import.meta.env.VITE_SOME_KEY}
        </div>
    </>
  )
}

export default Manual