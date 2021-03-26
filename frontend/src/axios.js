import axios from 'axios';
import api from './api';

export default axios.create({
  baseURL: api + '/api/',
});
