import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import TypeIt from "typeit-react";
import { Badge, Spinner } from "react-bootstrap";
import packages from "../../package.json";

function TaskSummery() {
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "bdL0iS3JlXELYKjsyrIEcgg3HfvZjQTf";

  function genarateSummery() {
    setIsLoading(true);
    const cleanedInput = input.replace(/└/g, "");
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      data: { sourceType: "TEXT", source: cleanedInput },
    };

    axios("https://api.ai21.com/studio/v1/summarize", options)
      .then((response) => {
        console.log(response.data);
        setOutput(response.data.summary);
        setIsLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          // title: err.response.data.detail,
          title: "Input Error",
          text: err.response.data.suggestion,
        });
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6">
            <div className="card shadow border-0">
              <div className="card-body">
                <form action="">
                  <div className="mb-3">
                    <h6 htmlFor="" className="form-label">
                      Enter Your Task List <Badge bg="primary">beta</Badge>
                    </h6>
                    <textarea
                      type="text"
                      className="form-control"
                      rows="15"
                      id="input"
                      name="input"
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <button
                      className="btn btn-outline-success"
                      type="button"
                      onClick={genarateSummery}
                    >
                      Genarate Task Summery
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Task Summery</h6>
                {isLoading ? (
                  <Spinner animation="border" className="text-center" />
                ) : (
                  output && (
                    <TypeIt
                      id="simpleUsage"
                      options={{ speed: 30, waitUntilVisible: true }}
                    >
                      {output}
                    </TypeIt>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskSummery;
