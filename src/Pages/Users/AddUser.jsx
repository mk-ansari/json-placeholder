import React from "react";
import {
  Box,
  TextField,
  Container,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddUser = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      website: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(10, "Full name must be less or equal 10 Characters.")
        .required("Full name is required."),
      userName: Yup.string()
        .max(10, "Username must be less or equal 10 Characters.")
        .required("Username is required."),
      email: Yup.string()
        .email("Incorrect Email")
        .required("Email is required."),
      website: Yup.string().required("Website is required"),
    }),
    onSubmit: async (values) => {
        // await fetch("https://jsonplaceholder.typicode.com/users", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         values
        //     }), headers:{
        //         "Content-type":"application/json; charset=UTF-8",
        //     }

        // }).then((res)=>{
        //     if (res.status !==201) {
        //         return
        //     }else{
        //         return res.json();
        //     }
        // }).then((data)=>{
        //    setUsers((users)=>[...users, data] );
        // }).catch((err)=>{
        //     console.log(err);
        // });
    //   console.log("Form Submitted", values);
    },
  });
  // console.log(formik.values);
  // console.log(formik.errors);

  return (
    <Container component="main" maxWidth="xs" sx={{mt:2}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h5" sx={{ my: 2 }}>
          Add User
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && formik.errors.fullName
                    ? true
                    : false
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                onBlur={formik.handleBlur}
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="userName"
                name="userName"
                label="User Name"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={
                  formik.touched.userName && formik.errors.userName
                    ? true
                    : false
                }
                helperText={formik.touched.userName && formik.errors.userName}
                onBlur={formik.handleBlur}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
                autoComplete="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="website"
                name="website"
                label="Website"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={
                  formik.touched.website && formik.errors.website ? true : false
                }
                helperText={formik.touched.website && formik.errors.website}
                onBlur={formik.handleBlur}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddUser;
