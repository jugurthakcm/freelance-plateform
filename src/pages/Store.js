import React from 'react';
import './Store.css';
import Navbar from '../components/Navbar';
import StackGrid from 'react-stack-grid';

const Store = () => {
  return (
    <>
      <Navbar />
      <StackGrid columnWidth={150}>
        <div key="key1">Item 1</div>
        <div key="key2">Item 2</div>
        <div key="key3">Item 3</div>
      </StackGrid>
    </>
  );
};

export default Store;
