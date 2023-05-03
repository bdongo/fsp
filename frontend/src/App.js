import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Review from "./components/Review";
import Business from "./components/Business";
import NavBar from "./components/NavBar";
import SearchPage from "./components/SearchPage";


function App() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={LoginForm}/>
        <Route path="/biz/:bizId" component={Business} />
        <Route path="/writeareview" component={Review}/>
        <Route path="/search" component={SearchPage} />
        <Redirect to="/login" />
      </Switch>
      <Route path='/' component={Footer} />
    </>
 

  );
}

export default App;
