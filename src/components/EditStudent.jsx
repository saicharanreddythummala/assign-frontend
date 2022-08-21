import React from "react";
import { Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../custom css/editstudent.css";
import axios from "axios";
import { useFormik } from "formik";

export default function EditStudent() {
  const URL = "https://assign-mentor-35.herokuapp.com";
  const params = useParams();

  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [mentors, setMentors] = useState([]);

  const getMentors = async () => {
    const res = await axios.get(`${URL}/mentors`);
    setMentors(res.data);
  };

  const getStudent = async () => {
    const res = await axios.get(`${URL}/students/${params.id}`);
    setStudent(res.data);
  };

  useEffect(() => {
    getMentors();
    if (params.id) {
      getStudent();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      mentor: "",
      mentor_id: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    await axios.put(`${URL}/students/${params.id}`, values);
    navigate("/");
    console.log(values);
  };

  return (
    <>
      <div className="student container-fluid d-flex flex-column align-items-center justify-content-center">
        <h4>Edit Student</h4>
        <div className="card d-flex p-3 border w-50">
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup row>
              <Label for="firstname" sm={3}>
                First Name
              </Label>
              <Col sm={9}>
                <Input
                  id="firstname"
                  placeholder="Enter first name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lastname" sm={3}>
                Last Name
              </Label>
              <Col sm={9}>
                <Input
                  id="lastname"
                  placeholder="Enter last name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={3}>
                Email
              </Label>
              <Col sm={9}>
                <Input
                  id="email"
                  placeholder="Enter email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="mentor" sm={3}>
                Mentor
              </Label>
              <Col sm={9}>
                <Input id="mentor" type="select" onChange={formik.handleChange}>
                  <option aria-readonly>--Select Mentor--</option>

                  {mentors.map((mentor) => (
                    <option
                      key={mentor._id}
                      onClick={() =>
                        formik.setFieldValue("mentor_id", mentor._id)
                      }
                    >
                      {mentor.firstname + " " + mentor.lastname}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col
                sm={{
                  offset: 9,
                  size: 10,
                }}
              >
                <Button type="submit">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    </>
  );
}
