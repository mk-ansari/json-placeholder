import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackBars = ({openSnackbar, handleSnackbarClose, status}) => {
  return (
    <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={status.type}
          sx={{ width: "100%" }}
        >
          {status.message}
        </Alert>
      </Snackbar>
  )
}

export default SnackBars