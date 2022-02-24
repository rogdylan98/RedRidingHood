import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './User.css'
import { getUserLists, makeList, editList, deleteList } from '../../store/lists';
import { NavLink } from 'react-router-dom';
import PortfolioChart from './PortfolioChart';
function User() {

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


  return (
    <>
      <div className='portfolio-main-container'>
        <div className='buying-power-outer-div'>
          <div className='chart-div'>
            <h1>$0.00</h1>
            <PortfolioChart />
          </div>
          <div className='buying-power-inner-div'>
            <button className='buying-power-button'>
              <header>
                <div className='buying-power-span-div'>
                  <span className='buying-power-span'>Buying Power</span>
                  <span className='balance-span'>${user.balance}</span>
                </div>
              </header>
            </button>
          </div>
          <div>
            <NavLink exact to='/stocks/AMZN'>
              Test Transaction Crud Here
            </NavLink>
          </div>
        </div>

      <div className='list-sidebar-div'>
        <div className='list-card-div'>
          <div className='list-grid-div'>
            <div className='list-grid-inner-div'>
              <div className='header-div'>
                <header className='header'>
                  <span className='list-span'>Lists</span>
                  <button className='add-list-button' onClick={() => setShowForm(true)}>
                    <span className='list-span'>Add List</span>
                  </button>
                </header>
              </div>
              <div className='list-outer-div' >
                {showForm && !edit &&
              <div className='create-list-div'>
                <form className='create-list-form' onSubmit={createList}>
                  <div className='create-list-div'>
                    <div className='create-list-input-div'>
                        <input className='create-list-input' type='text' placeholder='List Name' name='listname' onChange={updateName}></input>
                    </div>
                    <footer className='create-list-footer'>
                      <div className='footer-outer-div'>
                        <div className='cancel-button-div'>
                          <button className='cancel-button' onClick={() => setShowForm(false)}>
                            <span className='outer-cancel-span'>
                              <span className='cancel-span'>Cancel</span>
                            </span>
                          </button>
                        </div>
                        <div className='cancel-button-div'>
                          <button className='cancel-button' type='submit'>
                            <span className='outer-cancel-span'>
                              <span className='cancel-span'>Create List</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </footer>
                  </div>
                </form>
              </div>}
              {userlists && userlists.map(list => (
                <>
                  <div className='list-name-container' key={list.id}>
                    <button className='list-name-button'>
                      <div className='inner-list-name-container'>
                        <div className='left-list-name-div'>
                          <NavLink className='list-name-navlink' exact to={`/lists/${list.id}`}>
                            <div>
                            </div>
                            <div className='list-name-span-div'>
                              <span className='list-name-span'>{list.name}</span>
                            </div>
                          </NavLink>
                        </div>
                        <div className='edit-delete-div'>
                          <button onClick={() => {
                              setEdit(true)
                              setShowForm(true)
                              setListName(list.name)
                              setListId(list.id)
                            }
                            }>Edit</button>
                          <button onClick={() => handleDelete(list.id)}>Delete</button>
                        </div>
                      </div>
                    </button>
                  </div>
                  </>
              ))}
              {showForm && edit &&
              <div>
                <form onSubmit={handleEdit}>
                  <div>
                    <label>Edit List Name:</label>
                      <input type='text' name='listname' onChange={updateName} value={listname}></input>
                      <button type='submit'>Edit List</button>
                      <button onClick={() => {
                        setShowForm(false)
                        setEdit(false)
                      }}>Cancel</button>
                  </div>
                </form>
              </div>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
export default User;
