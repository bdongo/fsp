import { Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      {/* <h1>Hello from App</h1> */}
      <Route path="/login" component={LoginForm} />
      <Route exact path="/" component={LandingPage} />
    </>
 

  );
}

export default App;
