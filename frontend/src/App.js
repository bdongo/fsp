import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Review from "./components/Review";
import Business from "./components/Business";


function App() {
  return (
    <>
      {/* <h1>Hello from App</h1> */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={LoginForm}/>
        <Route path="/biz/:bizId" component={Business} />
        <Route path="/writeareview" component={Review}/>
        <Redirect to="/login" />
      </Switch>
      <Route path='/' component={Footer} />
    </>
 

  );
}

export default App;
