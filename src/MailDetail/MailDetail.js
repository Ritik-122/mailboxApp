import {
  Box,
  CardContent,
  Container,
  CssBaseline,
  Typography,
  Card,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";

export default function MailDetail() {
  const params = useParams();
  const mail = useSelector((state) => state.mail.mail);
  const final_data = mail.filter((j) => j.id === params.id);
  return (
    <>
      <CssBaseline />
      <Header />
     
      <Container
        component="main"
        maxWidth="lg"
        style={{ marginTop: "100px", marginLeft: "200px" }}
      >
        <Box width="1000px">
          <Card variant="outlined">
            <CardContent style={{ backgroundColor: "#2C3333" }}>
            <Typography>
              <Typography variant="h4" component="div" align="center" color='common.white'>
                Mail
              </Typography>
              <Typography style={{ display: "inline-block" }} variant='h6' color='common.white'>To:</Typography>
              <Typography variant="body2" style={{ display: "inline-block" }} color='common.white'>
                {" "}
                {final_data[0].from}
              </Typography>
              </Typography>
              <Typography>
              <Typography style={{ display: "inline-block" }} variant='h6' color='common.white'>
                Subject:
              </Typography>
              <Typography variant="body2" style={{ display: "inline-block" }} color='common.white'>
                {final_data[0].subject}
              </Typography>
              </Typography>
              <Typography>
              <Typography style={{ display: "inline-block" }} variant='h6' color='common.white'>
                Message:
              </Typography>
              <Typography variant="body2" style={{ display: "inline-block" }} color='common.white'>
                {final_data[0].message}
              </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
