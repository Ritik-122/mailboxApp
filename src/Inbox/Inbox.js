import {  CssBaseline, Toolbar, Typography } from "@material-ui/core";
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
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/redux";
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { useHistory } from "react-router-dom";
export default function Inbox() {

  const [trigger,setTrigger]=useState(false)
  const history=useHistory()

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
  
  const inboxMail=useSelector((state)=>state.mail.mail)
  const dispatch=useDispatch()
  let email_id = localStorage.getItem("Email");

  const  handleView=async (id)=>{
    history.replace(`/mailDetail/${id}`)
    try{
      email_id = email_id.replace("@", "");
      email_id = email_id.replace(".", "");
      const res = await axios.patch(
        `https://mailbox-b9a09-default-rtdb.firebaseio.com/receiver/${email_id}/${id}.json`,{isRead:true}
      );
      if(res.status===200){
        
        setTrigger(!trigger)
        dispatch(mailActions.inbox([res.data]))
       

  
      }
      }catch(error){
        alert(error);
      }
    
  
  }
  const handleDelete=async(id)=>
{
  try{
    email_id = email_id.replace("@", "");
    email_id = email_id.replace(".", "");
    const res = await axios.delete(
      `https://mailbox-b9a09-default-rtdb.firebaseio.com/receiver/${email_id}/${id}.json`
    );
    if(res.status===200){
      console.log('Deleted mail',res.data)
      setTrigger(!trigger)

    }
    }catch(error){
      alert(error.response.data.error.message);
    }

}
  useEffect(() => {
    async function fetchingMail() {
      email_id = email_id.replace("@", "");
      email_id = email_id.replace(".", "");
     
      try{
      const res = await axios.get(
        `https://mailbox-b9a09-default-rtdb.firebaseio.com/receiver/${email_id}.json`
      );
      if(res.status===200){
      
       
        const newArr1 = Object.values(res.data).map((v,index) => ({...v, id: Object.keys(res.data)[index]}))
        
        dispatch(mailActions.getMail(newArr1))

      }
      }catch(error){
        alert(error.response.data.error.message);
      }
    }
    fetchingMail();
  }, [dispatch,trigger]);
  



  return (
    <>
      <CssBaseline />
      <Header />
      <Typography variant="h4" style={{ marginTop: "10px" }} align='center' gutterBottom>
        Inbox
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "50px" }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell> 
              <StyledTableCell>From:&nbsp;</StyledTableCell>
              <StyledTableCell>Subject&nbsp;</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>{'     '}</StyledTableCell>
              <StyledTableCell>{'     '}</StyledTableCell>
              <StyledTableCell>{'     '}</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {inboxMail.map((row,index) => (
              <StyledTableRow>
              <StyledTableCell>{index+1}</StyledTableCell>
                <StyledTableCell>{row.from}</StyledTableCell>
                <StyledTableCell >{row.subject}</StyledTableCell>
                <StyledTableCell >{row.message.slice(0,45)}...</StyledTableCell>
                <StyledTableCell ><Button variant="contained" onClick={()=>handleView(row.id)}>View</Button></StyledTableCell>
                <StyledTableCell ><Button variant="contained" color="error" onClick={()=>handleDelete(row.id)}>Delete</Button></StyledTableCell>
                <StyledTableCell >{ row.isRead ?' ':<MarkChatUnreadIcon color="primary"/> }</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    </>
  );
}
