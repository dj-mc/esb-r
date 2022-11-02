import axios from 'axios';

const base_url = '/login/api';
const login_response = async (credentials: unknown) => {
  const response = await axios.post(base_url, credentials);
  return response.data;
};

export { login_response };
