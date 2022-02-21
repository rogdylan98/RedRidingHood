import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserLists, makeList } from '../store/lists';

function User() {
  // const [user, setUser] = useState({});
  // const { userId }  = useParams();
  const user = useSelector(state => state.session.user);
  const userlistsArr = useSelector(state => state.lists)
  const [listname, setListName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getUserLists(user.id))
    }
    )();

  }, []);


  const createList = async (e) => {
    e.preventDefault()
    await dispatch(makeList(user.id, listname))
  }

  const updateName = (e) => {
    setListName(e.target.value)
  }
  return (
    <>
      <div>
        <div>
          <span>{user.name}</span>
        </div>
        <div>
          <h1>Your Balance: {user.balance}</h1>
        </div>
      </div>
      <div>
        <header>Your Lists:
        {}
        </header>
      </div>
      <div>
        <form onSubmit={createList}>
          <div>
            <label>Enter List Name:</label>
              <input type='text' name='listname' onChange={updateName} value={listname}></input>
              <button type='submit'>Create List</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default User;
