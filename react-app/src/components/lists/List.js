import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getListbyId } from '../../store/lists';
import { addStockList } from '../../store/stocklists';
import { deleteStockinList, getStocksinList, getAllStocks } from '../../store/stocks';
import './List.css'

function List() {

  const { listid } = useParams()
  const currentList = useSelector(state => state.lists[listid]);
  const liststocks = useSelector(state => state.stocks[listid]?.stocks)
  const [remove, setRemove] = useState(false);
  const [showStocks, setShowStocks] = useState(false)
  const dispatch = useDispatch();
  const [listerrors, setListErrors] = useState(false)
  const [errors, setErrors] = useState([]);
  const [selectedStock, setSelectedStock] = useState(0);
  const [stockid, setStockId] = useState(0);
  const [stocks, setStocks] = useState([]);
  const stockCon = Object.values(stocks)
  const stockarr = stockCon[0];
  const [addStock, setAddStock] = useState(false);

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

    if(!listid) {
      setListErrors(true)
      setErrors(['Must select a valid stock'])
    }
    await dispatch(addStockList(stockid, listid))
    await dispatch(getStocksinList(listid))
    // setAddStock(true)
    setShowStocks(false)
  }

  return (
    <>
      {currentList &&
      <div className='list-container'>
        <div className='list-name-and-add-stock'>
          <div className='list-name-h2-div'>
           <h2 className='list-name-h2'>{currentList.name}</h2>
          </div>
          <div>
           <button className='add-stock-list-button' onClick={() => setShowStocks(true)}>
            <ion-icon name="add-outline"></ion-icon>
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
                {console.log("111111111", stockarr)}
                {console.log("222222222", stocks)}
                {showStocks && stockarr &&
                  stockarr.map(stock => (
                    <option key={stock.id} value={stock.id}>{stock.name}</option>
                  ))
                }
              </select>
              <button type='submit'>Submit</button>
            </form>
          </div>
        }
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
        {liststocks && !liststocks.length &&
          <div>
            <h1>You don't have any stocks in this list! Add one to see it</h1>
          </div>
         }
      </div>

      }
    </>
  );
}

export default List;
