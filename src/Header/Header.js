import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/redux";
import { useHistory } from "react-router-dom";
export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };
  const mail=useSelector((state)=>state.mail.mail)
  console.log(mail)
  let count=0;
  
    let c=mail.map((i)=>!i.isRead?count++:0)
  return (
    <>
      <CssBaseline />
      <AppBar position="relative"  >
        <Toolbar>
          <Typography variant="h4"  > MailBox Client</Typography>
          <Button variant="contained" color="default" style={{marginLeft:'20px'}} href='/welcome'>Compose</Button>
          <Button variant="contained" color="default" style={{marginLeft:'5px'}} href='/inbox'>Inbox<sup>{count}</sup></Button>
          <Button variant="contained" color="default" style={{marginLeft:'5px'}} href='/sent'>Sent</Button>
          <Button variant="contained" color="default" onClick={logout} style={{marginLeft:'760px'}}>
            Log Out
          </Button>
          </Toolbar>
      </AppBar>
    </>
  );
}
