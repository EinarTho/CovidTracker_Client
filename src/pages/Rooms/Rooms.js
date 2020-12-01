import React, { useContext } from 'react';
import { appContext } from '../../App';
import './Rooms.css';
import { getRooms, getCheckedRooms, submitHandler } from './helpers';

const Rooms = () => {
  const { rooms, setRooms, filter, setFilter, users, setUser } = useContext(
    appContext
  );
  return (
    <div className='rooms'>
      <div className='option_box'>
        <form
          onSubmit={e =>
            submitHandler(e, rooms, setRooms, users, setFilter, setUser)
          }
        >
          <label className='search_rooms'>
            <p className='paragraph'>Search:</p>
            <input
              className='input_field'
              type='text'
              onChange={e => setFilter(e.target.value)}
              value={filter}
            />
            <button>Use QR-Code</button>
          </label>
          <div className='heading_small'>All Rooms</div>
          {getRooms(rooms, setRooms, filter)}
          <div className='primary_btn_black'>
            <input
              type='submit'
              value={`Submit ${
                rooms.filter(room => room.checked).length
              } rooms`}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rooms;
