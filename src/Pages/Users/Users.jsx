import React, { useEffect, useState, Fragment } from "react";
import { Container } from "@mui/material";

// Components
import DialogBox from "../../components/DialogBox/DialogBox";
import SnackBars from "../../components/SnackBars/SnackBars";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import UsersTabel from "./UsersTabel";

const Users = () => {
  // initalvalues of useState.
  const initialValues = {
    name: "",
    username: "",
    email: "",
  };
  const statusValues = {
    message: "",
    type: null,
  };
  const dialogValues = {
    open: false,
    id: "",
  };
  const isEditValues = {
    status: false,
    id: "",
  };
  const loadingValues = {
    status: false,
    isLoading: "",
  };

  // useSatates
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(loadingValues);
  const [inputs, setInputs] = useState(initialValues);
  const [isEdit, setIsEdit] = useState(isEditValues);
  const [status, setStatus] = useState(statusValues);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(dialogValues);

  useEffect(() => {
    fetchData();
  }, []);

  //Dialog
  const handleDialogOpen = (id) => {
    setOpenDialog({ open: true, id });
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Snackbar
  const handleSnackbarClick = (message, type) => {
    setOpenSnackbar(true);
    setStatus({ message, type });
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Get Data using API.
  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      setUsers(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Inputs State
  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Submit Form.
  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit.status ? editUser(inputs) : addUser(inputs);
  };

  // Add User.
  const addUser = async (inputs) => {
    try {
      setLoading({ status: true, isLoading: "ADD" });
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      setUsers([...users, data]);
      setLoading(loadingValues);
      handleSnackbarClick("User Addded Successfully!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User.
  const deleteUser = async (id) => {
    try {
      setLoading({ status: true, isLoading: "DELETE" });
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });

      setUsers(
        users.filter((user) => {
          return user.id !== id;
        })
      );
      setLoading(loadingValues);
      setOpenDialog(dialogValues);
      handleSnackbarClick("User Deleted Successfully!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  // Edit State ON/OFF.
  const editToggle = async (id) => {
    setIsEdit({ status: true, id });
    const user = users.find((user) => {
      return user.id === id;
    });
    setInputs(user);
  };

  // Edit User
  const editUser = async (inputs) => {
    try {
      setLoading({ status: true, isLoading: "EDIT" });
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${inputs.id}`,
        {
          method: "PUT",
          body: JSON.stringify(inputs),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const editedUser = await res.json();

      setUsers(
        users.map((user) => {
          return user.id === inputs.id ? { ...editedUser } : user;
        })
      );

      setInputs(initialValues);
      setIsEdit(false);
      setLoading(loadingValues);
      handleSnackbarClick("User Updated Successfully!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <DialogBox
        openDialog={openDialog}
        loading={loading}
        deleteUser={deleteUser}
      />
      <SnackBars
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        status={status}
      />
      <Container sx={{ mt: 4 }}>
        {isEdit.status ? (
          <EditUser
            editUser={editUser}
            handleSubmit={handleSubmit}
            inputs={inputs}
            handleInput={handleInput}
            loading={loading}
          />
        ) : (
          <AddUser
            addUser={addUser}
            handleSubmit={handleSubmit}
            inputs={inputs}
            handleInput={handleInput}
            loading={loading}
          />
        )}
        <UsersTabel
          users={users}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isEditValues={isEditValues}
          setInputs={setInputs}
          initialValues={initialValues}
          editToggle={editToggle}
          handleDialogOpen={handleDialogOpen}
        />
      </Container>
    </Fragment>
  );
};

export default Users;
