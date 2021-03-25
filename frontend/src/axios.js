import axios from 'axios';

export default axios.create({
  baseURL: 'https://handelp.herokuapp.com/api/',
});
