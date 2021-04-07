const nodeEnv = 'production';

export default nodeEnv === 'developement'
  ? 'http://localhost:4000'
  : 'https://handelp.herokuapp.com';
