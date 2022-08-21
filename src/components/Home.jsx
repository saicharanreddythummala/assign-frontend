import React from "react";
import { Table } from "reactstrap";
import * as Ai from "react-icons/ai";
import "../custom css/home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const URL = "https://assign-mentor-35.herokuapp.com";

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);

  //get students
  const studentData = async () => {
    const res = await axios.get(`${URL}/students`);
    setStudents(res.data);
  };

  //get mentors
  const mentorData = async () => {
    const res = await axios.get(`${URL}/mentors`);
    setMentors(res.data);
  };

  //delete a student by their id
  const deleteStudent = async (id) => {
    const res = await axios.delete(`${URL}/students/${id}`);
    console.log(res);
    studentData();
  };

  //delete a mentor by their id
  const deleteMentor = async (id) => {
    const res = await axios.delete(`${URL}/mentors/${id}`);
    console.log(res);
    mentorData();
  };

  useEffect(() => {
    studentData();
    mentorData();
  }, []);

  return (
    <>
      <div className="home container-fluid d-flex flex-column justify-content-around">
        <div>
          <h4>Student list:</h4>
          <div className="card mt-4">
            <Table hover>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mentor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.email}</td>
                    <td>{student.mentor}</td>
                    <td>
                      <div className="row d-flex justify-content-around">
                        <button
                          className="btn btn-sm btn-dark border col-3 fs-6 "
                          onClick={() =>
                            navigate(`/edit-student/${student._id}`)
                          }
                        >
                          <Ai.AiFillEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-dark border col-3 fs-6"
                          onClick={() => {
                            deleteStudent(student._id);
                          }}
                        >
                          <Ai.AiFillDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div>
          <h4>Mentor list:</h4>
          <div className="card">
            <Table hover>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map((mentor, index) => (
                  <tr key={mentor._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{mentor.firstname}</td>
                    <td>{mentor.lastname}</td>
                    <td>{mentor.email}</td>
                    <td>
                      <div className="row d-flex justify-content-around">
                        <button
                          className="btn btn-sm btn-dark border col-3 fs-6 "
                          onClick={() => navigate(`/edit-mentor/${mentor._id}`)}
                        >
                          <Ai.AiFillEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-dark border col-3 fs-6 "
                          onClick={() =>
                            navigate(`/assign-students/${mentor._id}`)
                          }
                        >
                          <Ai.AiFillEye />
                        </button>
                        <button
                          className="btn btn-sm btn-dark border col-3 fs-6"
                          onClick={() => {
                            deleteMentor(mentor._id);
                          }}
                        >
                          <Ai.AiFillDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
