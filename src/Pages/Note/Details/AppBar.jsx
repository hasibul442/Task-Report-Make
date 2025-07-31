import React from "react";
import { FaCopy, FaDownload, FaTimes, FaUpload } from "react-icons/fa";
import "./style.css";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";
function AppBar({ fileName, note, id }) {
  const handleToDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([note], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(note);
    Swal.fire({
      icon: "success",
      title: "You have successfully copied the note.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleUpdateNote = async () => {
    try {
      await updateDoc(doc(db, "notes", id), {
        note: note,
        name: fileName,
        updated_by: getAuth().currentUser.email,
        updated_at: new Date(),
      });
      Swal.fire({
        icon: "success",
        title: "Note updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating note: ", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update note.",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <>
      <div className="appbar d-flex align-items-center justify-content-between px-3">
        <div className="d-flex align-items-center gap-2">
          <img
            src="/logo.svg"
            alt="Logo"
            width="20"
            height="20"
            className="me-2"
          />
          <span className="text-white small fw-bold">My VSCode App</span>
        </div>

        {/* Center - Filename (optional) */}
        <div className="text-white small d-none d-md-block">{fileName}</div>

        {/* Right - Window Controls */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-success btn-sm text-white"
            onClick={handleUpdateNote}
          >
            <FaUpload className="icon-hover" />
          </button>
          <button
            className="btn btn-outline-primary btn-sm text-white"
            onClick={handleCopyToClipboard}
          >
            <FaCopy className="icon-hover" />
          </button>
          <button
            className="btn text-white btn-outline-info btn-sm"
            onClick={handleToDownload}
          >
            <FaDownload className="icon-hover" />
          </button>
          <a
            href="/notes"
            className="btn btn-outline-danger btn-sm text-white text-decoration-none"
          >
            <FaTimes className="icon-hover" />
          </a>
        </div>
      </div>
    </>
  );
}

export default AppBar;
