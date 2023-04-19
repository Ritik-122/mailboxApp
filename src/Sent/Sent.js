import { CssBaseline, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import fetchMail from "../hooks/fetch-mail";

export default function Sent() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [apiData, setApiData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  let email_id = localStorage.getItem("Email");
  const handleDelete = async (id) => {
    try {
      email_id = email_id.replace("@", "");
      email_id = email_id.replace(".", "");
      const res = await axios.delete(
        `https://mailbox-b9a09-default-rtdb.firebaseio.com/sender/${email_id}/${id}.json`
      );
      if (res.status === 200) {
        console.log("Deleted mail", res.data);
        setTrigger(!trigger);
      }
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };
  email_id = email_id.replace("@", "");
  email_id = email_id.replace(".", "");

  const myfun = (res) => {
    if (res.status === 200) {
      const newArr1 = Object.values(res.data).map((v, index) => ({
        ...v,
        id: Object.keys(res.data)[index],
      }));
      setApiData(newArr1);
    }
  };
  const mailData = fetchMail(
    `https://mailbox-b9a09-default-rtdb.firebaseio.com/sender/${email_id}.json`,
    myfun
  );

  useEffect(() => {
    mailData();
  }, [trigger]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Typography
        variant="h4"
        style={{ marginTop: "10px" }}
        align="center"
        gutterBottom
      >
        Sent Mail
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "50px" }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>To:&nbsp;</StyledTableCell>
              <StyledTableCell>Subject&nbsp;</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>

              <StyledTableCell> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row, index) => (
              <StyledTableRow>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.subject}</StyledTableCell>
                <StyledTableCell>{row.message}</StyledTableCell>

                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
