import React from "react";
import { Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import "../custom css/editmentor.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { host } from "../util/api";

export default function EditStudent() {
  const params = useParams();
  
  const navigate = useNavigate()

  const [mentor, setMentor] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const getMentor = async () => {
    const res = await axios.get(`${host}/mentors/${params.id}`);
    setMentor(res.data);
  };

  useEffect(() => {
    if (params.id) {
      getMentor();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: mentor.firstname,
      lastname: mentor.lastname,
      email: mentor.email,
    },
    enableReinitialize: true,
    onSubmit:(values)=>{
      handleSubmit(values);
    }
  });

  const handleSubmit = async (values)=>{
    await axios.put(`${host}/mentors/${params.id}`,values);
    navigate("/")
  }

  return (
    <>
      <div className="mentor container-fluid d-flex flex-column align-items-center justify-content-center">
        <h4>Edit Mentor</h4>
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
