import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './User.css'
import { getUserLists, makeList, editList, deleteList } from '../../store/lists';
import { getUserReceipts, getUserPortfolioValue } from '../../store/user'
import { NavLink } from 'react-router-dom';
import PortfolioChart from './PortfolioChart';
function User() {

  const user = useSelector(state => state.session.user);
  const userlistsObj = useSelector(state => state.lists);
  const userlists = Object.values(userlistsObj);
  const [listname, setListName] = useState('');
  const [listId, setListId] = useState(0);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState([])
  const [userReceipts, setUserReceipts] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(getUserLists(user.id));
      dispatch(getUserReceipts(user.id)).then(res => {
        if (res) {
          setUserReceipts(res)
        }
      });
      dispatch(getUserPortfolioValue(user.id)).then(res => {
        if (res) {
          setPortfolioValue(res)
        }
      })
    }
  }, [user]);


  const createList = async (e) => {
    e.preventDefault();
    setErrors([])
    const data = await dispatch(makeList(user.id, listname));
    if (data) {
      setErrors(data)
  }
    await dispatch(getUserLists(user.id));
    setShowForm(false);
  }

  const updateName = (e) => {
    setListName(e.target.value);
  }

  const handleDelete = async (listid) => {
    await dispatch(deleteList(listid));
    await dispatch(getUserLists(user.id));
    setErrors([]);

  }

  const handleEdit = async (e) => {
    e.preventDefault();
    setShowForm(false);
    setEdit(false);
    const data = await dispatch(editList(listId, listname));
    if (data) {
      setErrors(data)
    }
    await dispatch(getUserLists(user.id));
  }


  return (
    <>
      <div className='portfolio-main-container'>
        <div className='buying-power-outer-div'>
          <div className='chart-div'>
            <h1 className='portfolio-share-value'>${portfolioValue.toFixed(2)}</h1>
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
          <h2 className='receipts-heading'>Your Stock Transaction Receipts</h2>
          <div className='transaction-block'>
            {userReceipts.map(receipt => (
              <div className='receipt-container' key={receipt.name}>
                <div>
                  <NavLink exact to={`/stocks/${receipt.ticker}`}>
                    <button className='receipt-stock-name'>
                      {receipt.name}
                    </button>
                  </NavLink>
                </div>
                <div className='receipt-info'>
                  <span className='receipt-shares'>Total Shares Owned: {receipt.shares}</span>
                  <span className='receipt-share-value'>Share Value: {receipt.share_value}</span>
                </div>
              </div>

            ))}
          </div>
        </div>

      <div className='list-sidebar-div'>
        <div className='list-card-div'>
          <div className='list-grid-div'>
            <div className='list-grid-inner-div'>
              <div className='header-div'>
                <header className='header'>
                  <span className='list-span'>Lists</span>
                  <button className='add-list-button' onClick={() => {
                    setErrors([])
                    setShowForm(true)
                    }}>
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
                        <input className='create-list-input' type='text' placeholder='List Name' name='listname' onChange={updateName} value={listname}></input>
                    </div>
                    <footer className='create-list-footer'>
                      <div className='footer-outer-div'>
                        <div className='cancel-button-div'>
                          <button className='cancel-button' type='submit'>
                            <span className='outer-cancel-span'>
                              <span className='cancel-span'>Create</span>
                            </span>
                          </button>
                        </div>
                        <div className='cancel-button-div'>
                          <button className='cancel-button' onClick={() => setShowForm(false)}>
                            <span className='outer-cancel-span'>
                              <span className='cancel-span'>Cancel</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </footer>
                  </div>
                </form>
              </div>}
              {errors && errors.map((error, ind) => (
                                <span key={ind} className="purchasing-power-div">{error}</span>
                            ))}
              {userlists && userlists.map(list => (
                  <div className='list-name-container' key={list.id}>
                      <div className='inner-list-name-container'>
                        <button className='list-name-button'>
                            <div className='left-list-name-div'>
                              <NavLink className='list-name-navlink' exact to={`/lists/${list.id}`}>
                                <div>
                                </div>
                                <div className='list-name-span-div'>
                                  <span className='list-name-span'>{list.name}</span>
                                </div>
                              </NavLink>
                            </div>
                        </button>
                        <div className='edit-delete-div'>
                          <button onClick={() => {
                              setEdit(true)
                              setShowForm(true)
                              setErrors([])
                              setListName(list.name)
                              setListId(list.id)
                            }
                            }>Edit</button>
                          <button onClick={() => handleDelete(list.id)}>Delete</button>
                        </div>
                      </div>
                  </div>
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
