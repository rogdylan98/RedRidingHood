import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getListbyId } from '../store/lists';
// import { getStocksinList } from '../store/stocks';

function List() {

  const { listid } = useParams()
  const currentList = useSelector(state => state.lists[listid])
  const dispatch = useDispatch()

  useEffect(() => {
    if (listid) {
      dispatch(getListbyId(listid))
      // dispatch(getStocksinList(listid))
    }
  }, [listid])

  return (
    <>
      {currentList &&
      <h2>{currentList.name}</h2>
      }
    </>
  );
}

export default List;
