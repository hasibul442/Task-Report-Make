import React, { useEffect } from "react";
import { useState } from "react";
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
  } from "firebase/firestore";
  import { db } from "../../firebase";
import { FaTrash } from "react-icons/fa";
function NoteCreate() {
  const [fileData, setFileData] = useState("");
  const [filename, setFilename] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let fileNames = event.target.files[0].name;
      fileNames = fileNames.split(".").slice(0, -1).join(".");
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilename(fileNames);
        setFileData(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please Select File");
    }
  };

  //Add Data to Firebase
  const addNote = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "notes"), {
        name: filename,
        note: fileData,
        create_at: new Date(),
      });
    //   setFileData("");
    //   setFilename("");
    window.location.reload();
      // await getEmployee();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Read Data from Firebase
    const [notesdata, setnotesdata] = useState([]);

    const getNotes = async () => {
        const querySnapshot = await getDocs(
            collection(db, "notes"),
            orderBy("create_at", "desc")
        );
        const notesdata = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setnotesdata(notesdata);
        };

    useEffect(() => {
        getNotes();
    }
    , []);
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-sm-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <form action="">
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      Please Insert File
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  {/* Add Submit button */}
                  <button type="submit" 
                  className="btn btn-outline-success" 
                    onClick={addNote}
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-5" style={{}}>
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h6>{filename}</h6>
                  <p style={{ whiteSpace: "pre-line" }}>{fileData}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card border-0 shadow">
              <div className="card-body">
                <table className="table  table-sm">
                  <thead>
                    <tr>
                      <th scope="col">File Name</th>
                      <th scope="col">Note</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notesdata.map((note) => (
                      <tr key={note.id}>
                        <td>{note.name}</td>
                        <td style={{ whiteSpace: "pre-line" }}>{note.note}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteEmployee(note.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCreate;
