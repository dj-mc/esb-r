import axios from 'axios';

const base_url = '/login/api';

let token = '';

const set_token = (new_token: string) => {
  token = `bearer ${new_token}`;
};

const auth_config = (token: string) => {
  return { headers: { Authorization: token } };
};

const login_response = async (credentials: unknown) => {
  const response = await axios.post(base_url, credentials);
  return response.data;
};

export const login_service = { set_token, auth_config, login_response, token };
