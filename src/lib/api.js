const api = require('./url');
const axios = require('axios');

const getRandomData = () => {
  return axios.get(api.randomDataUrl);
};

const registerApi = (userData) => {
  return axios.post(api.registerUrl, userData);
};

const loginApi = (userData) => {
  return axios.post(api.loginUrl, userData);
};

const updateUserApi = (userData, token) => {
  const userId = userData.id;

  delete userData.id;
  delete userData.iat;

  return axios.put(`${api.updateUserUrl}/${userId}`, userData, {
    headers: {
      Authorization: token,
    },
  });
};

module.exports = { getRandomData, registerApi, loginApi, updateUserApi };
