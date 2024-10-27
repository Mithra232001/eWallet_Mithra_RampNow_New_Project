import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import { GetUsers } from "../api/userApi";
import { GetTransactionData, CreateTransactionData } from "../api/transactionApi";

const Transaction = ({ selectedUser, onClose }) => {
  const [formData, setFormData] = useState({ amount: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  };

  //api calls
  useEffect(() => {
    getUsers();
    getTransactionData();
  }, []);

  const getUsers = async () => {
    const res = await GetUsers();
    setLoggedInUser(res.data.username);
  };

  const getTransactionData = async () => {
    const res = await GetTransactionData();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(formData.amount) > selectedUser.balance) {
      newErrors.amount = "Amount exceeds available balance";
    } else if (parseFloat(formData.amount) < 0) {
      newErrors.amount = "Amount must be positive";
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle the transaction logic here
      console.log("Transaction data:", {
        ...formData,
        to: selectedUser.username,
        from: loggedInUser,
      });
      const res = await CreateTransactionData({
        ...formData,
        to: selectedUser.username,
        from: loggedInUser,
      });
      console.log(res);
      onClose(); // Close the transaction form after submission
      getTransactionData();
      getUsers();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <h3 className="text-center">
            Create Transaction with {selectedUser.username}
          </h3>
          <Form onSubmit={handleSubmit}>
            <Row className="mt-4">
              <Col md={12}>
                <FormGroup>
                  <Label for="amount">Amount</Label>
                  <Input
                    type="number" // Change to number for amount
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    invalid={!!errors.amount}
                    placeholder="Enter your amount"
                  />
                  {errors.amount && (
                    <FormFeedback>{errors.amount}</FormFeedback>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="text" // Change to text for description
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    invalid={!!errors.description}
                    placeholder="Enter your description"
                  />
                  {errors.description && (
                    <FormFeedback>{errors.description}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit" block>
              Send Amount
            </Button>
            {/* <Button color="secondary" type="button" block onClick={onClose} className="mt-2">
              Cancel
            </Button> */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
