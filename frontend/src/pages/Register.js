import React, { useState } from "react";
import {
  Form,
  Container,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import { register } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userid: "",
    userNo: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Validate username
    if (!formData.username) {
      formErrors.username = "Username is required";
    }

    // Validate email
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.userid) {
      formErrors.userid = "User Id is required";
    }

    if (!formData.userNo) {
      formErrors.userNo = "User No is required";
    }

    // Validate password
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    //validate confirm password
    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword =
        "Confirm password and password needs to be same";
    }
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
      try {
        await register(formData);
        console.log("registration successful");
        navigate("/login");
      } catch (error) {
        console.log("err", error);
      }
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h3 className="text-center">Register</h3>
            <Form onSubmit={handleSubmit}>
              <Row className="mt-4">
                <Col md={6}>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      invalid={!!errors.username}
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <FormFeedback>{errors.username}</FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      invalid={!!errors.email}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <FormFeedback>{errors.email}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="userid">ID Type</Label>
                    <Input
                      type="select"
                      name="userid"
                      id="userid"
                      value={formData.userid}
                      onChange={handleChange}
                      invalid={!!errors.userid}
                      placeholder="Enter your user id type"
                    >
                      <option value="">Select Id type</option>
                      <option value="aadhar">Aadhar card</option>
                      <option value="passport">Passport</option>
                      <option value="license">Driving License</option>
                    </Input>
                    {errors.userid && (
                      <FormFeedback>{errors.userid}</FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="userNo">Id Number</Label>
                    <Input
                      type="text"
                      name="userNo"
                      id="userNo"
                      value={formData.userNo}
                      onChange={handleChange}
                      invalid={!!errors.userNo}
                      placeholder="Enter your user id type"
                    />
                    {errors.userNo && (
                      <FormFeedback>{errors.userNo}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      invalid={!!errors.password}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <FormFeedback>{errors.password}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      invalid={!!errors.confirmPassword}
                      placeholder="Enter your password"
                    />
                    {errors.confirmPassword && (
                      <FormFeedback>{errors.confirmPassword}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary" type="submit" block>
                Register
              </Button>
            </Form>
            <br />
            <p>
              Already a user? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
