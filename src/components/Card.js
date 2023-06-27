import React, { useEffect, useMemo, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  const sortedUsers = useMemo(() => {

    const clonedUsers = [...users];


    const quickSort = (arr, left, right) => {
      if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
      }
    };

    const partition = (arr, left, right) => {
      const pivot = new Date(arr[right].birthdate).getTime();
      let i = left - 1;

      for (let j = left; j < right; j++) {
        if (new Date(arr[j].birthdate).getTime() <= pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }

      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
      return i + 1;
    };


    quickSort(clonedUsers, 0, clonedUsers.length - 1);

    return clonedUsers;
  }, [users]);

  const Card = () => {
    return (
      <main data-testid="card" className="d-flex gap-4 p-5">
        {sortedUsers.map(user => (
          <div
            className="card text-white bg-dark mb-3"
            style={{ maxWidth: "18rem" }}
            key={user.id}
          >
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <p className="card-text">{user.email}</p>
              <h5 className="card-title">{user.birthdate}</h5>
            </div>
          </div>
        ))}
      </main>
    );
  };

  return <Card />;
};

export default UserList;