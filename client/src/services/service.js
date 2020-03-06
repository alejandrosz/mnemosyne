import axios from 'axios';
// require('dotenv').config();

class IndexService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      // baseURL: `http://localhost:3010/api/auth`,
      withCredentials: true
    });
  }

  getUser = (id) => {
    return this.service.get(`/profile/${id}`)
    .then(user => user.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

export default IndexService;