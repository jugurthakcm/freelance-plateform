import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token) history.push('/login');
  }, [user, history]);

  return <div>You are successfully Logged In</div>;
};

export default Dashboard;
