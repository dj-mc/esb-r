import axios from 'axios';

const login_url = '/login/api';
const register_url = '/users/api';

let token = '';

const set_token = (new_token: string) => {
  token = `bearer ${new_token}`;
};

const auth_config = (token: string) => {
  return { headers: { Authorization: token } };
};

const login_response = async (credentials: unknown) => {
  const response = await axios.post(login_url, credentials);
  return response.data;
};

const register_response = async (credentials: unknown) => {
  const response = await axios.post(register_url, credentials);
  return response.data;
};

export const auth_service = {
  set_token,
  auth_config,
  login_response,
  register_response,
  token
};
