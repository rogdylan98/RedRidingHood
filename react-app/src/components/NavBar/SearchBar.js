import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { searchStocks } from '../../store/stocks';
import './SearchBar.css'

const SearchBar = () => {

  const dispatch = useDispatch();
  const [searchStock, setSearchStock] = useState('');
  const [menuOpen, setMenuOpen] = useState(false)
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (searchStock !== ''){
      setMenuOpen(true)
      dispatch(searchStocks(searchStock)).then(res => {
        setResult(Object.values(res))
      });
    } else setMenuOpen(false)

  }, [searchStock]);



  return (
      <div className='search-bar-container'>
          <svg color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
          <input
            placeholder='Search'
            value={searchStock}
            onChange={e => setSearchStock(e.target.value)}
            onFocus={e => {
              if (e.target.value) setMenuOpen(true);
            }}
            className={!menuOpen && 'grey-text'}
          ></input>
          { menuOpen &&
          <>
            <div className='background-overlay-transparent' onClick={e =>
            {
              setMenuOpen(false)
            }
            }></div>
            <div className='background-container'>
              <div className='search-result-container'>
                { result.length ?
                  result.map(stock => {
                    return (
                      <NavLink key={stock.id} className='search-result-stock-container' to={`/stocks/${stock.ticker}`} onClick={e =>
                      {setSearchStock('')
                      setMenuOpen(false)}
                      }>
                        <div className='ticker'>
                          <span>{stock.ticker}</span>
                        </div>
                        <div className='stockinfo'>
                            <span>{stock.name} | {stock.price}</span>
                        </div>
                      </NavLink>
                    )
                  })
                  :
                  <div className='no-result-found'>
                    <p>No results found.</p>
                  </div>
                }
              </div>
            </div>
          </>}
      </div>
  );
}

export default SearchBar;
