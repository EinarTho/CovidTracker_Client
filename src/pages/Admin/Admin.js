import React, { useContext, useState } from 'react';
import { appContext } from '../../App';
import './Admin.css';
import { createMatchingRooms, submitHandler, filterCheck } from './helpers';
import AdminSelect from './AdminSelect/AdminSelect';

const Admin = () => {
  const { rooms, filter, setFilter, users } = useContext(appContext);
  const [matchingRooms, setMatchingRooms] = useState(
    createMatchingRooms(rooms)
  );
  return (
    <div className="admin">
      <h1>ADMIN</h1>
      <div className="option_box">
        <form onSubmit={(e) => submitHandler(e, matchingRooms, users)}>
          <label className="search_rooms">
            <p className="paragraph">Search:</p>
            <input
              className="input_field"
              type="text"
              onChange={(e) => setFilter(e.target.value)}
            />
            <button>Use QR-Code</button>
          </label>
          <div className="heading_small">All Rooms</div>
          {matchingRooms.map((room) => {
            if (filterCheck(room, filter)) {
              return (
                <div key={room.roomId} className="option">
                  <AdminSelect
                    key={room._id}
                    matchingRooms={matchingRooms}
                    setMatchingRooms={setMatchingRooms}
                    room={room}
                    rooms={rooms}
                  ></AdminSelect>
                </div>
              );
            }
          })}
          <div className="primary_btn_black">
            <input
              type="submit"
              value={`Submit ${
                matchingRooms.filter((room) => room.edited === 'true').length
              } ${
                matchingRooms.filter((room) => room.edited === 'true')
                  .length === 1
                  ? 'change'
                  : 'changes'
              }`}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
