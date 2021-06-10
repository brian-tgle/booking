import Repository from './repository';

const url = 'auth';

const AuthRepository = {
  /**
   * /POST. Login into the system
   * @param {Object} payload the username and password
   * @return {Object} the JWT
   */
  login: (payload) => Repository.post(`${url}/login`, payload)
};

export default AuthRepository;
