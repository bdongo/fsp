import { Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Route path="/login" component={LoginForm} />
    </>
 

  );
}

export default App;
