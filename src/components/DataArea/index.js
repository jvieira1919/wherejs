import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import Nav from './Nav';
import api from '../utils/api';
import '../../styles/data.css';
import data from '../../utils/data';

const DataArea = () => {
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: 'descend',
    filteredUsers: [],
    headings: [
      { name: 'Image', width: '10%', order: 'descend' },
      { name: 'name', width: '10%', order: 'descend' },
      { name: 'phone', width: '20%', order: 'descend' },
      { name: 'email', width: '20%', order: 'descend' },
      { name: 'dob', width: '10%', order: 'descend' },
    ],
  });

  const handleSort = (heading) => {
    let currentOrder = developerState.headings
      .filter((elem) => elem.name === heading)
      .map((elem) => elem.order)
      .toString();

    if (currentOrder === 'descend') {
      currentOrder = 'ascend';
    } else {
      currentOrder = 'descend';
    }

    const compareFnc = (a, b) => {
      if (currentOrder === 'ascend') {
        if (a[heading] === undefined) {
          return 1;
        }
        if (b[heading] === undefined) {
          return -1;
        }
        if (heading === 'name') {
          return a[heading].first.localeCompare(b[heading].first);
        }
        if (heading === 'dob') {
          return a[heading].age - b[heading].age;
        }
        return a[heading].localeCompare(b[heading]);
      }
      if (a[heading] === undefined) {
        return 1;
      }
      if (b[heading] === undefined) {
        return -1;
      }
      if (heading === 'name') {
        return b[heading].first.localeCompare(a[heading].first);
      }
      if (heading === 'dob') {
        return b[heading].age - a[heading].age;
      }
      return b[heading].localeCompare(a[heading]);
    };

    const sortedUsers = developerState.filteredUsers.sort(compareFnc);

    const updatedHeadings = developerState.headings.map((elem) => {
      elem.order = elem.name === heading ? currentOrder : elem.order;
      return elem;
    });

    setDeveloperState({
      ...developerState,
      filteredUsers: sortedUsers,
      headings: updatedHeadings,
    });
  };

  const handleSearchChange = (event) => {
    const filter = event.target.value;
    // eslint-disable-next-line
    const filteredList = developerState.users.filter((item) => {
      const values = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`;
      console.log(filter, values);
      if (values.indexOf(filter.toLowerCase()) !== -1) {
        return item;
      }
    });

    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

  useEffect(() => {
    api.getUsers().then((results) => {
      console.log(results.data.results);
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results,
      });
    });
  });

  return (
    <data.Provider
      value={{ developerState, handleSearchChange, handleSort }}
    >
      <Nav />
      <div className="data-area">
        {developerState.filteredUsers.length > 0 ? <DataTable /> : <div />}
      </div>
    </data.Provider>
  );
};

export default data;
