import React, { useEffect, useState } from "react";
import * as Fc from "react-icons/fc";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "reactstrap";
import "../custom css/assignstudents.css";
import { host } from "../util/api";

export default function AssignStudents() {
  
  const params = useParams();
  const [mentor, setMentor] = useState({});
  const [students, setstudents] = useState([]);

  const getMentor = async () => {
    const res = await axios.get(`${host}/mentors/${params.id}`);
    setMentor(res.data);
  };

  const getStudents = async () => {
    const res = await axios.get(`${host}/students/unassigned`);
    setstudents(res.data);
  };

  const handleAssign = async (id, data) => {
    await axios.put(`${host}/students/${id}`, data);
    getStudents();
  };

  useEffect(() => {
    getMentor();
    getStudents();
  }, []);

  return (
    <>
      <div className="assign container-fluid d-flex flex-column ">
        <div className=" w-25 h-25 p-3 align-self-center">
          <Fc.FcManager id="mentor" />
          <p className="text-center">{mentor.firstname}</p>
        </div>

        <div className="card">
          Unassigned Student list:
          <Table hover>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Student Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.firstname + " " + student.lastname}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-dark border col-3 fs-6"
                      onClick={() => {
                        handleAssign(student._id, {
                          mentor: mentor.firstname + " " + mentor.lastname,
                          mentor_id: mentor._id,
                        });
                      }}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
