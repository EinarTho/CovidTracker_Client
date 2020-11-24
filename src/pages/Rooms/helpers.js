import RoomSelect from './RoomSelect/RoomSelect';

const filterCheck = (room, filter) => {
  const patternString = '.*' + filter + '.*';
  const pattern = new RegExp(patternString, 'gi');
  if (pattern.test(room.id) || pattern.test(room.name)) {
    return true;
  }
  return false;
};

export const getAllRooms = (rooms, setRooms, filter) => {
  const allRooms = rooms
    .filter((el) => filterCheck(el, filter))
    .map((room) => {
      return (
        <div key={room.id} className="option">
          <RoomSelect
            key={room.id}
            rooms={rooms}
            setRooms={setRooms}
            room={room}
          ></RoomSelect>
        </div>
      );
    });
  return allRooms;
};

const createUserObject = (room, users) => {
  return {
    room: room.id,
    employeeId: users._id,
  };
};

export const submitHandler = (e, rooms, users) => {
  e.preventDefault();
  const checkedRooms = rooms.filter((room) => room.checked);
  const responseBody = checkedRooms.map((room) => {
    return createUserObject(room, users);
  });
  console.log('Send POST to /users/addvisitedrooms with body:');
  console.log(responseBody);
};

//OLD SUBMITHANDLER
// const submitHandler = (e) => {
//   e.preventDefault();
//   console.log('About to fetch!');
//   const payload = {};
//   payload.personId = 3;
//   payload.rooms = rooms
//     .filter((room) => room.checked)
//     .map((room) => {
//       return {
//         id: room.id,
//         time: '14:45',
//       };
//     });
//   console.log({ payload });
//   const requestOptions = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   };
//   fetch('http://localhost:8080/api/employeeModel', requestOptions)
//     .then((res) => res.json())
//     .then((json) => console.log(json));
// };
