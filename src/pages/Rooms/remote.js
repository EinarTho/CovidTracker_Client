import axios from 'axios';
const serverUrl = 'https://novid-backend.herokuapp.com/api';

export const addRoomsToUser = async (body, user) => {
  const url = `${serverUrl}/users/visitedrooms`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.accessToken,
    },
  };
  try {
    const response = await axios.put(url, body, options);
    console.log(response.data);
    return response.status;
  } catch (err) {
    console.log('Something went wrong:', err);
  }
};
