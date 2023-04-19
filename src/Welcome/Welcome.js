import React, { useEffect, useRef } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Header from "../Header/Header";
import { Box, Card, CardContent } from "@mui/material";

export default function Welcome() {
  let email_id = localStorage.getItem("Email");
  let content;
  const onEditorStateChange = (event) => {
    content = event.getCurrentContent().getPlainText();
  };
  const email = useRef("");
  const subject = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mailData = {
      email: email.current.value,
      subject: subject.current.value,
      message: content,
      isRead:false
    };

    email_id = email_id.replace("@", "");
    email_id = email_id.replace(".", "");
    try {
      const res = await axios.post(
        `https://mailbox-b9a09-default-rtdb.firebaseio.com/sender/${email_id}.json`,
        mailData
      );
      const receiverData = {
        from: localStorage.getItem("Email"),
        message: content,
        subject: subject.current.value,
        isRead:false
      };
      let recieverEmail=email.current.value
      recieverEmail =  recieverEmail.replace("@", "");
      recieverEmail =  recieverEmail.replace(".", "");
      const res2 = await axios.post(
        `https://mailbox-b9a09-default-rtdb.firebaseio.com/receiver/${recieverEmail}.json`,
        receiverData
      );
      if(res2.status===200){
        console.log('sent recieverData')

      }
      
      if (res.status === 200) {
        console.log("sent successfully");
        email.current.value = "";
        subject.current.value = "";
      }
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" style={{ marginTop: "100px" }}>
      <Box width="1000px">
      <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle2">From: {email_id}</Typography>
          <TextField
            fullWidth
            label="To:"
            id="fullWidth"
            type="email"
            style={{ marginBottom: "2px" }}
            inputRef={email}
          />

          <TextField
            fullWidth
            label="Subject:"
            id="fullWidth"
            style={{ marginBottom: "2px" }}
            inputRef={subject}
          />

          <Editor
            placeholder="Type your message here"
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />

          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form></CardContent></Card></Box>
      </Container>
      
    </>
  );
}
