import React from 'react';
import './App.css';
import { createContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Admin from './Pages/Admin/Admin';
import Business from './Pages/Business/Business';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Privacy from './Pages/Privacy/Privacy';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import RegisterAdmin from './Pages/RegisterAdmin/index';
import Rooms from './Pages/Rooms/Rooms.js';
// import XDevNav from './Components/XDevNav/XDevNav';
import QRcreator from './Pages/QRcreator/index';
import QRreader from './Pages/QRreader/index';
import NotFound from './Pages/NotFound/index';
import RetrievePassword from './Pages/RetrievePassword/RetrievePassword';
const remote = require('./Remote/remote');
// import Main from './components/Main/Main';

export const appContext = createContext();

const testRooms = [
  { _id: Object(), roomId: 1, name: 'Technium', floor: 1, checked: false },
  { _id: Object(), roomId: 2, name: 'BongoRoom', floor: 4, checked: false },
  { _id: Object(), roomId: 3, name: 'Kitchen', floor: 4, checked: false },
  { _id: Object(), roomId: 4, name: 'Office4', floor: 4, checked: false },
  { _id: Object(), roomId: 5, name: 'Office5', floor: 4, checked: false },
  { _id: Object(), roomId: 6, name: 'Office6', floor: 4, checked: false },
  { _id: Object(), roomId: 7, name: 'Office7', floor: 4, checked: false },
  { _id: Object(), roomId: 8, name: 'Office8', floor: 4, checked: false },
  { _id: Object(), roomId: 9, name: 'Office9', floor: 4, checked: false },
  { _id: Object(), roomId: 10, name: 'Office10', floor: 4, checked: false },
  { _id: Object(), roomId: 11, name: 'Office11', floor: 4, checked: false },
  { _id: Object(), roomId: 12, name: 'Office12', floor: 4, checked: false },
];

const testUser = {
  _id: 'Object(mongodb-Id?)',
  floor: 1,
  firstName: 'Trude',
  lastName: 'Hansen',
  email: 'email@gmail.com',
  password: 'password',
  companyId: 1,
  visits: [],
  inRisk: false,
  accessToken: '123456789',
};

function App() {
  const [rooms, setRooms] = useState(testRooms);
  const [users, setUser] = useState(testUser);
  const [filter, setFilter] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); //not sure we actually need this - but its convenient to determine whether to redirect when a user redirects or registers

  useEffect(() => {
    remote.getAllRooms(setRooms);
    console.log(localStorage.getItem('InfectionInspectionUser'));
    setUser(JSON.parse(localStorage.getItem('InfectionInspectionUser')));
  }, []);
  console.log(rooms);
  return (
    <appContext.Provider
      value={{
        rooms,
        setRooms,
        filter,
        setFilter,
        users,
        setUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      <Router>
        <div className='App'>
          {/*<Header></Header>*/}
          <div className='main'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/rooms' component={Rooms} />
              <Route exact path='/privacy' component={Privacy} />
              <Route exact path='/business' component={Business} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/registerAdmin' component={RegisterAdmin} />
              <Route
                exact
                path='/retrievepassword'
                component={RetrievePassword}
              />
              <Route exact path='/admin' component={Admin} />
              <Route exact path='/creator' component={QRcreator} />
              <Route exact path='/reader' component={QRreader} />
              <Route path='/404' component={NotFound} />
              <Redirect to='/404' />
            </Switch>
          </div>
          {/* <Main></Main> */}
          {/* <XDevNav></XDevNav> */}
          <Footer/>
        </div>
      </Router>
    </appContext.Provider>
  );
}

export default App;
