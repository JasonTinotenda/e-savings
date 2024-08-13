// src/services/api.js
import axios from 'axios';
import { REACT_APP_API_URL} from '../.env';

export const fetchPosts = () => axios.get(`${REACT_APP_API_URL}/posts`);
