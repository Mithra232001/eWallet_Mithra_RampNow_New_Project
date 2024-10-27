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
import { login } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // Validate email
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    // Validate password
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
      // Submit the data to an API or perform further actions
    }
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.data.data);
      navigate("/Home");
      console.log("registration successful");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={3}>
            <h3 className="text-center">Login</h3>
            <Form onSubmit={handleSubmit}>
              <Row className="mt-4">
                <Col md={12}>
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
              </Row>
              <Button color="primary" type="submit" block>
                Login
              </Button>
            </Form>
            <br />
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
