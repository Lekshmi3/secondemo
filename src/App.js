import logo from './logo.svg';
import './App.css';
import Home from './Component/Home';
import Add from './Component/Add';
import Edit from './Component/Edit';

import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

const App = () => {
  return (
    <div className="container mt-5">
      
      <Router>
        <div className="card">
          <div className="card-header">
            <NavLink className="btn btn-primary btn-sm" to="/" exact>Home</NavLink>&nbsp;&nbsp;
         <NavLink className="btn btn-primary btn-sm" to="/add-std">Add</NavLink> 
          </div>
          <div className="card-body">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/add-std" component={Add} />
              <Route path="/edit-std/:id" component={Edit} />
            </Switch>
          </div>
        </div>


      </Router>
    </div>
  );
}

export default App;