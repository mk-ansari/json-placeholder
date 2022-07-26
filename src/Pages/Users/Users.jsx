import React, { useEffect, useState, Fragment } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Stack,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

import { Container } from "@mui/system";
import Loader from "../../components/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = () => {
  const initialValues = {
    name: "",
    username: "",
    email: "",
  };
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(initialValues);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      setUsers(await res.json());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit ? editUser(inputs) : addUser(inputs);
  };

  const addUser = async (inputs) => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      setUsers([...users, data]);
      setInputs(initialValues);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });

      setUsers(
        users.filter((user) => {
          return user.id !== id;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editToggle = async (id) => {
    setLoading(true);
    setIsEdit(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "GET",
      }
    );
    setInputs(await res.json());
    setLoading(false);
  };

  const editUser = async (inputs) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "username", label: "Username", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "operations",
      label: "Operations",
      minWidth: 100,
      colSpan: 2,
      align: "center",
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Container sx={{ mt: 4 }}>
            {isEdit ? (
              <Stack
                direction="row"
                component="form"
                onSubmit={handleSubmit}
                spacing={2}
                sx={{ my: 2, justifyContent: "center" }}
              >
                <TextField
                  id="name"
                  name="name"
                  value={inputs.name}
                  onChange={handleInput}
                  label="Name"
                />
                <TextField
                  id="userName"
                  name="username"
                  value={inputs.username}
                  onChange={handleInput}
                  label="User Name"
                />
                <TextField
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleInput}
                  label="Email"
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Update
                </Button>
              </Stack>
            ) : (
              <Stack
                direction="row"
                component="form"
                onSubmit={handleSubmit}
                spacing={2}
                sx={{ my: 2, justifyContent: "center" }}
              >
                <TextField
                  id="name"
                  name="name"
                  value={inputs.name}
                  onChange={handleInput}
                  label="Name"
                  autoFocus
                />
                <TextField
                  id="userName"
                  name="username"
                  value={inputs.username}
                  onChange={handleInput}
                  label="User Name"
                />
                <TextField
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleInput}
                  label="Email"
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Add
                </Button>
              </Stack>
            )}

            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            background: "#d3d3d3",
                          }}
                          colSpan={column.colSpan}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="edit"
                              color="success"
                              onClick={() => editToggle(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() => deleteUser(row.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Users;
