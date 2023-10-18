import React, {useEffect, useState} from "react";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    orderBy
} from "firebase/firestore";
import {db} from "../firebase";

import {FaTrash} from "react-icons/fa";

function Employee() { // Employee Data Create
    const [employee, setEmployee] = useState("");

    const handleInputChange = (e) => {
        setEmployee(e.target.value);
    };

    const addEmployee = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "employees"), {
                name: employee,
                create_at: new Date()
            });
            setEmployee("");
            await getEmployee();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Employee Data Read read and sort data
    const [empdata, setEmpdata] = useState([]);

    const getEmployee = async () => {
        const querySnapshot = await getDocs(collection(db, "employees"), orderBy("create_at", "desc"));
        const empdata = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setEmpdata(empdata);
    };

    useEffect(() => {
        getEmployee();
    }, []);

    // Employee Data Delete
    const deleteEmployee = async (id) => {
        try {
            await deleteDoc(doc(db, "employees", id));
            await getEmployee();
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-6">
                        <h5 className="">Employee Add</h5>

                        <div className="">
                            <input type="text" className="form-control w-75" placeholder="Write Employee Name"
                                value={employee}
                                onChange={handleInputChange}/>
                        </div>
                        <div className="btn-container mt-3">
                            <button type="submit" className="btn btn-outline-success"
                                onClick={addEmployee}>
                                Add Employee
                            </button>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <table className="table display">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Employee</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody> {
                                empdata.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{
                                                index + 1
                                            }</td>
                                            <td>{
                                                item.name
                                            }</td>
                                            <td>
                                                <button className="btn btn-outline-danger btn-sm"
                                                    onClick={
                                                        () => deleteEmployee(item.id)
                                                }>
                                                    <FaTrash/>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            } </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Employee;

