import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Agent from "./pages/Agent";
import Customer from "./pages/Customer";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/agent/:agentId">
              <Agent />
            </Route>
            <Route path="/customer/:customerId">
              <Customer />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
