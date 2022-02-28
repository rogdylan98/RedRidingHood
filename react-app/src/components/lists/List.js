import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getListbyId, getUserLists, editList } from '../../store/lists';
import { addStockList } from '../../store/stocklists';
import { deleteStockinList, getStocksinList, getAllStocks } from '../../store/stocks';
import './List.css'

function List() {
  const user = useSelector(state => state.session.user);
  const { listid } = useParams()
  const currentList = useSelector(state => state.lists[listid]);
  const liststocks = useSelector(state => state.stocks[listid]?.stocks)
  const [showStocks, setShowStocks] = useState(false)
  const dispatch = useDispatch();
  const [listerrors, setListErrors] = useState(false)
  const [errors, setErrors] = useState([]);
  const [selectedStock, setSelectedStock] = useState(0);
  const [stockid, setStockId] = useState(0);
  const [stocks, setStocks] = useState([]);
  const stockCon = Object.values(stocks)
  const stockarr = stockCon[0];
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [listname, setListName] = useState('');


  useEffect(() => {
    if (listid) {
      dispatch(getListbyId(listid))
      dispatch(getStocksinList(listid))
      dispatch(getAllStocks()).then(res => {
        setStocks(res)
      })
    }
  }, [listid])

  // useEffect(() => {
  //   if (addStock) {
  //     console.log("ARE WE HEREEEEE?")
  //     dispatch(getStocksinList(listid))
  //   }
  //   setAddStock(false)
  // }, [addStock])

  const handleDelete = async (stockid) => {
      await dispatch(deleteStockinList(stockid, listid))
      await dispatch(getStocksinList(listid))
  }

  const handleAddStock = async (e) => {
    e.preventDefault()

    const data = await dispatch(addStockList(stockid, listid));
    if (data) {
      setErrors(data)
      if (errors) {
        return
      }
    }
    await dispatch(getStocksinList(listid))
    setShowStocks(false)
    setErrors([])
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = await dispatch(editList(listid, listname));
    if (data) {
      setErrors(data)
      if (errors) {
        return
      }
    }
    await dispatch(getUserLists(user.id));
    setShowForm(false);
    setEdit(false);
    setErrors([])
  }

  const updateName = (e) => {
    setListName(e.target.value);
  }

  return (
    <>
      {currentList &&
      <div className='list-container'>
        <div className='edit-and-errors-div'>
        {errors && errors.map((error, ind) => (
          <span key={ind} className="error-div">{error}</span>
        ))}
          {showForm && edit &&
            <div>
              <form onSubmit={handleEdit}>
                <div>
                  <label className='edit-list-label'>New Name:</label>
                    <input type='text' name='listname' onChange={updateName} value={listname}></input>
                    <button className='edit-list-button' type='submit'>Edit List</button>
                    <button className='cancel-list-button' onClick={() => {
                      setShowForm(false)
                      setEdit(false)
                      setErrors([])
                    }}>Cancel</button>
                </div>
              </form>
            </div>
          }
          </div>
        <div className='list-name-and-add-stock'>
          <div className='list-name-h2-div'>
           <h2 className='list-name-h2'>{currentList.name}</h2>
          </div>
          <div className='list-buttons'>
           <button className='add-stock-list-button' onClick={() => setShowStocks(true)}>
            <ion-icon name="add-outline"></ion-icon>
           </button>
           <button className='edit-lists' onClick={() => {
                setEdit(true)
                setShowForm(true)
                setErrors([])
              }
            }>
              Edit
            </button>
          </div>
        </div>
        {showStocks &&
          <div>
            <form onSubmit={handleAddStock}>
              <select name='stocks' value={selectedStock} onChange={(e) => {
                setSelectedStock(e.target.value)
                setStockId(e.target.value)
              }}>
                <option value={0}>Select A Stock</option>
                {showStocks && stockarr &&
                  stockarr.map(stock => (
                    <option key={stock.id} value={stock.id}>
                    {stock.name}
                    </option>
                  ))
                }
              </select>
              <button className='edit-list-button' type='submit'>Submit</button>
              <button className='cancel-list-button' onClick={() =>
              {setShowStocks(false)
              setErrors([])}
              }>Cancel</button>
            </form>
          </div>
        }
        <div className='user-lists-div'>
        {liststocks && liststocks.length !== 0 && liststocks.map(stock => (
          <>
            <div key={stock.id} className='ind-list-container'>
              <NavLink className='stock-navlink' exact to={`/stocks/${stock.ticker}`}>
                <span className='stock-name-p'>{stock.name} </span>
                <span className='stock-price-span'>${stock.price}</span>
              </NavLink>
              <button onClick={() => handleDelete(stock.id)} className='remove-button-list'>Remove</button>
            </div>
          </>
        ))}
        </div>
        {liststocks && !liststocks.length &&
          <div>
            <h1>You don't have any stocks in this list!</h1>
          </div>
         }
      </div>
      }

    </>
  );
}

export default List;
