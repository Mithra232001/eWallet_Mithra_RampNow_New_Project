import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers, GetAllUsers } from "../api/userApi";
import Transaction from "./Transaction";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [usersData, setUsersData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    getAllUsers();
  }, []);

  const getUsers = async () => {
    const res = await GetUsers();
    setUsersData(res.data);
  };

  const getAllUsers = async () => {
    const res = await GetAllUsers();
    setAllUsers(res.data);
  };

  const handleCloseModal = () => {
    setSelectedUser("");
    setModalOpen(false);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleViewTransaction = () => {
    navigate("/TransactionDetails");
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 style={{ fontWeight: "bold" }}>User Profile</h1>
      </div>

      {/* User Profile Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Profile Details</h5>
          <p className="card-text">
            <strong>Username:</strong> {usersData.username || "Loading..."}
          </p>
          <p className="card-text">
            <strong>Balance:</strong> ${usersData.balance || "0.00"}
          </p>
          <Button color="primary" onClick={handleViewTransaction}>
            View Transaction
          </Button>
        </div>
      </div>

      {/* All Users List */}
      <div className="mb-4">
        <h2>All Users</h2>
        <ul className="list-group">
          {allUsers
            .filter((user) => user._id !== usersData._id)
            .map((user) => (
              <li
                key={user._id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleUserClick(user)}
                style={{
                  cursor: "pointer",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <span>{user.username}</span>
                <FaArrowRight style={{ color: "#007bff" }} />
              </li>
            ))}
        </ul>
      </div>

      {/* Transaction Modal */}
      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Create Transaction</ModalHeader>
        <ModalBody>
          {selectedUser && (
            <Transaction selectedUser={selectedUser} onClose={handleCloseModal} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Home;
