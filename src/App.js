import React from "react";
import "./styles/main.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Home } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
    
            <Route component={Home} path="/" exact />
            <Route path="/*" exact>
              <Redirect to="/" />
            </Route>
    
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
