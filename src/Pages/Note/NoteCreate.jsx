import React, { useEffect } from "react";
import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  query
} from "firebase/firestore";
import { db } from "../../firebase";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Masonry from "react-responsive-masonry";
import DateDiffer from "../Components/DateDiffer";
function NoteCreate() {
  const [fileData, setFileData] = useState("");
  const [filename, setFilename] = useState("");
  const [lastModified, setLastModified] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFilename(file.name);
      setFileData(event.target.result);
      setLastModified(file.lastModifiedDate.toLocaleString());
    };
    reader.readAsText(file);
  };

  //Add Data to Firebase
  const addNote = async (e) => {
    if (fileData === "") {
      Swal.fire({
        icon: "error",
        title: "Please Select File",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      e.preventDefault();
      try {
        await addDoc(collection(db, "notes"), {
          name: filename,
          note: fileData,
          lastModified: lastModified,
          create_at: new Date(),
        });
        window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const [notesdata, setnotesdata] = useState([]);

  const getNotes = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "notes"), orderBy("create_at", "desc"))
    );
    const notesdata = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setnotesdata(notesdata);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const filteredNotes = notesdata.filter((note) => {
    const nameMatch = note.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const noteMatch = note.note
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || noteMatch;
  });

  // Delete Data from Firebase
  const deleteNote = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this note!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "notes", id));
          await getNotes();
          Swal.fire({
            icon: "success",
            title: "You have successfully deleted the note.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            icon: "error",
            title: "Cancelled",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Edit Data from Firebase
  const editNote = async (id) => {
    Swal.fire({
      icon: "info",
      title: "This Function is Under Upgradation",
      showConfirmButton: true,
    });
    //   try {
    //     const docRef = doc(db, "notes", id);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       console.log("Document data:", docSnap.data());
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
  };

  const handleCopyToClipboard = (id) => {
    const note = notesdata.find((note) => note.id === id);
    navigator.clipboard.writeText(note.note);
    Swal.fire({
      icon: "success",
      title: "You have successfully copied the note.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

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
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onClick={addNote}
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div>
              <div
                className="card border-0 shadow"
                style={{ height: "150px", overflowY: "scroll" }}
              >
                <div className="card-body">
                  <h6>{filename}</h6>
                  <p style={{ whiteSpace: "pre-line" }}>{fileData}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="my-5">
          <div className="">
            <div className="">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Masonry columnsCount={4} gutter="30px">
            {filteredNotes.map((note, index) => (
              <div className="notes" key={index}>
                <div className="card shadow border-0">
                  <div className="card-body">
                    <h6>{note.name}</h6>
                    <p className="fw-bold text-info font-monospace">
                      {note.lastModified}
                    </p>

                    <p style={{ whiteSpace: "pre-line" }}>{note.note}</p>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between">
                      <div>
                        <DateDiffer createAt={note.create_at} />
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-info btn-sm mx-1"
                          onClick={() => handleCopyToClipboard(note.id)}
                        >
                          <FaCopy />
                        </button>
                        <button
                          className="btn btn-outline-success btn-sm mx-1"
                          onClick={() => editNote(note.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm mx-1"
                          onClick={() => deleteNote(note.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </section>
      </div>
    </>
  );
}

export default NoteCreate;
