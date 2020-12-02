import React, { useState, useContext, createContext, useEffect } from 'react';
import './Dashboard.css';
import Header from '../../Components/Header/Header';
import { appContext } from '../../App';
import Calendar from 'react-calendar';
import ReactModal from 'react-modal';
const remote = require('../../Remote/remote');
const axios = require('axios');
const serverUrl = 'http://localhost:8080/api/';
const qs = require('querystring');

const Dashboard = () => {
  const { users } = useContext(appContext);
  const [rooms, setRooms] = useState([]);
  const [notified, setNotified] = useState(false);
  const [calendarDate, setCaldarDate] = useState(new Date());
  const [calendarShown, setCalendarShown] = useState(false);
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    remote.getAllRooms(setRooms);
  }, []);

  const registerPositiveTest = () => {
    axios
      .put(
        `${serverUrl}/users/positivetest`,
        qs.stringify({
          _id: users._id,
        })
      )
      .then(() => {
        setNotified(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const visitListMaker = (date, users) => {
    const roomsToBeDisplayed = users.visits.filter(visit => {
      return (
        visit.date ===
        `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      );
    });
    if (
      new Date().toString() === date.toString() &&
      roomsToBeDisplayed.length === 0
    ) {
      return <h1>You have not entered any visited rooms today.</h1>;
    }
    if (roomsToBeDisplayed.length === 0) {
      return (
        <h1>
          You did not visit any roooms on the date: {date.getDate()}/
          {date.getMonth() + 1}/{date.getFullYear()}
        </h1>
      );
    }
    const roomsWithNames = findNames(roomsToBeDisplayed);
    return roomsWithNames.map((visits, index) => makeJSXRooms(visits, index));
  };

  const makeJSXRooms = (visit, index) => {
    const dateArr = visit.date.split('/');
    const date = `${dateArr[0]}/${parseInt(dateArr[1]) + 1}/${dateArr[2]}`;

    return (
      <div key={index}>
        <h1>{visit.name}</h1>
        <p>RoomId: {visit._id}</p>
        <p>Date: {date}</p>
        <p>Time: {visit.time}</p>
        <button>Delete Room</button>
      </div>
    );
  };

  const findNames = roomList => {
    const roomsWithNames = roomList.map(room => {
      room.name = rooms.filter(compRoom => {
        return room._id === compRoom._id;
      })[0].name;
      return room;
    });
    return roomsWithNames;
  };

  if (rooms.length === 0) {
    return <h1>Loading rooms..</h1>;
  }

  return (
    <div>
      <Header />

      <h1> Dashboard </h1>
      <button onClick={registerPositiveTest} className='primary_btn_black'>
        Register Positive Covid test
      </button>
      {notified && (
        <p>People you have been in contact with are now being warned!</p>
      )}

      <ReactModal isOpen={calendarShown} style={modalStyles}>
        <Calendar
          onChange={date => {
            setCaldarDate(date);
            setCalendarShown(false);
          }}
          value={calendarDate}
        />
        <button
          className='primary_btn_black'
          onClick={() => setCalendarShown(false)}
        >
          Click to hide calendar
        </button>
      </ReactModal>
      <div className='room-container'>
        <h1>Visited Rooms</h1>
        <p>Date: {calendarDate.toDateString()}</p>
        {visitListMaker(calendarDate, users)}
        <button
          onClick={() => setCalendarShown(true)}
          className='primary_btn_black'
        >
          Change date
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
