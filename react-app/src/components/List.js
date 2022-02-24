import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getListbyId } from '../store/lists';
import { deleteStockinList, getStocksinList } from '../store/stocks';

function List() {

  const { listid } = useParams()
  const currentList = useSelector(state => state.lists[listid]);
  const liststocks = useSelector(state => state.stocks[listid]?.stocks)
  const [remove, setRemove] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    if (listid) {
      dispatch(getListbyId(listid))
      dispatch(getStocksinList(listid))
    }
  }, [listid])

  // useEffect(() => {
  //   if (remove) {
  //     dispatch(deleteStockinList())
  //     dispatch(getStocksinList(listid))
  //     setRemove(false)
  //   }
  // })

  const handleDelete = async (stockid) => {
      await dispatch(deleteStockinList(stockid, listid))
      await dispatch(getStocksinList(listid))
  }

  return (
    <>
      {currentList &&
      <div>
        <h2>{currentList.name}</h2>
        {liststocks && liststocks.map(stock => (
          <>
            <div key={stock.id}>
              <NavLink className='stock-navlink' exact to={`/stocks/${stock.ticker}`}>
                <p>{stock.name}</p>
              </NavLink>
              <button onClick={() => handleDelete(stock.id)}>Remove from List</button>
            </div>
          </>
        ))}
      </div>

      }
    </>
  );
}

export default List;
