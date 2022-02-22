import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserLists, makeList, editList, deleteList } from '../../store/lists';

function User() {
  // const [user, setUser] = useState({});
  // const { userId }  = useParams();
  const user = useSelector(state => state.session.user);
  const userlistsObj = useSelector(state => state.lists);
  const userlists = Object.values(userlistsObj);
  const [listname, setListName] = useState('');
  const [listId, setListId] = useState(0);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (user) {
      dispatch(getUserLists(user.id));
    }
  }, [user]);

  // useEffect(() => {
  //   if (onEdit) {
  //     dispatch(getUserLists(user.id))
  //   }
  // })

  const createList = async (e) => {
    e.preventDefault();
    await dispatch(makeList(user.id, listname));
    await dispatch(getUserLists(user.id));
    setShowForm(false);
  }

  const updateName = (e) => {
    setListName(e.target.value);
  }

  const handleDelete = async (listid) => {
    await dispatch(deleteList(listid));
    await dispatch(getUserLists(user.id));
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    setShowForm(false);
    setEdit(false);
    await dispatch(editList(listId, listname));
    await dispatch(getUserLists(user.id));
  }

  // const editForm = (listid) => {
  //   return (
  //     <form onSubmit={handleEdit(listid, listname)}>
  //       <label>New Name: </label>
  //       <input type='text' name='listname' onChange={updateName} value={listname}></input>
  //       <button type='submit'>Edit List</button>
  //     </form>
  //   )
  // }

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
        {userlists && userlists.map(list => (
          <div key={list.id}>
            <li>
              {list.name}
            </li>
            <button onClick={() => {
                setEdit(true)
                setShowForm(true)
                setListName(list.name)
                setListId(list.id)
              }
              }>Edit</button>
            <button onClick={() => handleDelete(list.id)}>Delete</button>
          </div>
        ))}
        </header>
      </div>
      <button onClick={() => setShowForm(true)}>Make a List</button>
      {showForm && !edit &&
      <div>
        <form onSubmit={createList}>
          <div>
            <label>Enter List Name:</label>
              <input type='text' name='listname' onChange={updateName}></input>
              <button type='submit'>Create List</button>
          </div>
        </form>
      </div> }

      {showForm && edit &&
      <div>
        <form onSubmit={handleEdit}>
          <div>
            <label>Edit List Name:</label>
              <input type='text' name='listname' onChange={updateName} value={listname}></input>
              <button type='submit'>Edit List</button>
          </div>
        </form>
      </div>
      }
    </>
  );
}
export default User;
