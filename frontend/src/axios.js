import axios from 'axios';

const nodeEnv = 'developement';

const url =
  nodeEnv === 'developement'
    ? 'http://localhost:4000/api/'
    : 'https://handelp.herokuapp.com/api/';

export default axios.create({
  baseURL: url,
});
