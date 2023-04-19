import { Redirect, Route, Switch } from "react-router-dom";
import SignUp from "./Login/Signup";
import SignIn from "./Login/Login";
import Welcome from "./Welcome/Welcome";
import { useSelector} from "react-redux";
import Inbox from "./Inbox/Inbox";
import Sent from "./Sent/Sent";
import MailDetail from "./MailDetail/MailDetail";
function App() {
  const status=useSelector((state)=>state.auth.token)
  const isLoggedIn=status?true:false
  console.log(isLoggedIn)
  return (
    <>
      <Switch>
      {isLoggedIn && <Route path="/" exact>
          <Redirect to='/welcome'/>
        </Route>}
        {!isLoggedIn && <Route path="/" exact>
          <SignUp />
        </Route>}

        <Route path="/login" exact>
          <SignIn />
        </Route>
        {isLoggedIn && <Route path="/welcome" exact>
          <Welcome />
        </Route>}
        {!isLoggedIn && <Route path="/welcome" exact>
          <Redirect to='/login'/>
        </Route>}
        <Route path='/inbox'>
          <Inbox/>
        </Route>
        <Route path='/sent'>
          <Sent/>
        </Route>
        <Route path='/mailDetail/:id'>
          <MailDetail/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
