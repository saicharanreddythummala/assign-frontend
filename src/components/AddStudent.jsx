import React from "react";
import { Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import "../custom css/addstudent.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const URL = "https://assign-mentor-35.herokuapp.com";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    await axios.post(`${URL}/students`, values);
    navigate("/");
  };

  return (
    <>
      <div className="student container-fluid d-flex flex-column align-items-center justify-content-center">
        <h4>Add Student</h4>
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
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  onChange={formik.handleChange}
                />
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
