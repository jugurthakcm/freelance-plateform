import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token) history.push('/login');
  }, [user, history]);

  return (
    <>
      <Navbar />
      <div className="dashboard"></div>
    </>
  );
};

export default Dashboard;
