import { Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";


function App() {
  return (
    <>
      {/* <h1>Hello from App</h1> */}
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={LoginForm}/>
    </>
 

  );
}

export default App;
