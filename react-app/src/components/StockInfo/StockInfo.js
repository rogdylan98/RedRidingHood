import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getStock} from "../../store/stocks";
import { makeTransaction, getUserTransactions} from "../../store/transactions";
import { getBalance } from "../../store/user";
import './StockInfo.css';
import PortfolioChart from "../PortfolioPage/PortfolioChart";
import { getUserLists} from "../../store/lists";
import { getStockLists, addStockList } from "../../store/stocklists";
import { getUserReceipts} from '../../store/user'

const StockInfo = () => {
    const { ticker } = useParams();
    const stock = useSelector(state => state.stocks[ticker]);
    const userid = useSelector(state => state.session.user.id)
    const userBalance = useSelector(state => state.session.user.balance);
    const userlists = useSelector(state => state.lists);
    const listarr = Object.values(userlists);
    const [updateBalance, setUpdateBalance] = useState(false)
    const [balance, setBalance] = useState(userBalance)
    const [errors, setErrors] = useState([]);
    const [listerrors, setListErrors] = useState(false)
    const [buttonBg, setButtonbg] = useState(1);
    const [method, setMethod] = useState('buy');
    const [shares, setShares] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const receiptObj = useSelector(state => state.transactions)
    const receipts = Object.values(receiptObj);
    const [addList, setAddList] = useState(false)
    const [selectedList, setSelectedList] = useState(0);
    const [listid, setListid] = useState(0);
    const [listform, setlistform] = useState(false);
    const stockList = useSelector(state => state.stocklists.lists);
    const [userReceipts, setUserReceipts] = useState([]);

    // const [updateLists, setUpdateLists] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (ticker) {
            dispatch(getUserLists(userid))
            dispatch(getStock(ticker))
            dispatch(getUserTransactions(userid, ticker))
            dispatch(getStockLists(ticker))
            dispatch(getUserReceipts(userid)).then(res => {
                if (res) {
                  setUserReceipts(res)
                }
              });
        }
        // dispatch(getUserTransactions(userid, stock.id))

    }, [ticker])


    useEffect(() => {
        if (updateBalance) {
            dispatch(getBalance(userid)).then(res => {
                if (res) {
                    setBalance(res)
                }

            })
            setUpdateBalance(false)
        }
    })

    useEffect(() => {
        if (addList) {
            dispatch(getStockLists(ticker))
        }
        setAddList(false)
    }, [addList])

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const data = await dispatch(makeTransaction(userid, stock.id, shares, method, totalCost))
        if (data) {
            setErrors(data)
        }
        await dispatch(getUserReceipts(userid)).then(res => {
            if (res) {
              setUserReceipts(res)
            }
          });
        setUpdateBalance(true)
    }

    const updateShares = (e) => {
        setShares(e.target.value)
        const input = (e.target.value * stock.price);
        const total = Math.ceil(input * 100) / 100;
        setTotalCost(total)
    }

    const handleBuy = (e) => {
        e.preventDefault()
        setMethod('buy')
        if (buttonBg === 1) {
            setButtonbg(0)
        } else {
            setButtonbg(1)
        }
    }

    const handleSell = (e) => {
        e.preventDefault()
        setMethod('sell')
        if (buttonBg === 2) {
            setButtonbg(0)
        } else {
            setButtonbg(2)
        }
    }

    // const handleSelect = (e) => {
    //     setSelectedList(e.target.value)
    //     setListid(e.target.value)
    //     console.log(listid)
    // }

    const handleAddStock = async (e) => {
        e.preventDefault()
        // setListid(e.target.value)
        if (!listid) {
            setListErrors(true)
            setErrors(['Must select a valid list'])
        }
        const data = await dispatch(addStockList(stock.id, listid))
        if (data) {
            setErrors(data)
            setListErrors(true)
            if (errors) {
              return
            }
          }
        setAddList(true)
        setlistform(false)
        setListErrors(false)
        setErrors([])
    }

    // useEffect(() => {

    // })

    const handleAddList = () => {
        if (listarr.length) {
            setlistform(true)
        } else {
            setListErrors(true)
            setErrors(["Error! You don't have any lists!"])
        }
    }
    return (
        <>
            {stock &&
            <div className="stock-page-container" >
                <div className="stock-info-container">
                    <div className="stock-name-tkr-container">
                        <h1 className="stock-name">{stock.name}</h1>
                        <h1 className="stock-name">${stock.price}</h1>
                    </div>
                    <div className="stock-graph-container">
                        <PortfolioChart endpoint={stock.price}/>
                    </div>
                    <div className="stock-about-container">
                        <h2 className="stock-h2">About</h2>
                        <p className="about-p-stock">{stock.description}</p>
                    </div>
                    <div>
                        <h2 className="stock-h2">Lists with {stock.name}:</h2>
                        {stockList && stockList.length === 0 && <h2 className="no-lists">No lists yet</h2>}
                        {stockList && stockList.map(list => (
                            <NavLink className='list-nav-link' key={list.id} exact to={`/lists/${list.id}`}>
                                <button className="list-button-stock">{list.name}</button>
                            </NavLink>
                        ))}
                    </div>

                </div>
                <div className="right-side-stock">
                {/* <div className="receipts">
                    {receipts && receipts.map(r => (
                    <div key={r.id}>
                        <div>Your Shares of {stock.name}: {r.shares}</div>
                        <div>Current Market Value: {r.share_value}</div>
                    </div>
                ))}
                </div> */}
                <div className="stock-form-container">
                    <form onSubmit={onSubmit} className="stock-form">
                        <div className="buy-sell-div">
                            <div className={buttonBg === 1 ? 'shadow' : 'noshadow'} onClick={handleBuy}>
                                <span  className="buy-sell-span">Buy {stock.ticker}</span>
                            </div>
                                <span className="buy-sell-span-noclick"> | </span>
                            <div className={buttonBg === 2 ? 'shadow' : 'noshadow'} onClick={handleSell}>
                                <span className="buy-sell-span">Sell {stock.ticker}</span>
                            </div>
                        </div>
                        <div className="buy-sell-info-container">
                            <div className="buy-sell-info-container">
                                {errors && !listerrors && errors.map((error, ind) => (
                                    <span key={ind} className="error-span-stock">{error}</span>
                                ))}
                                <div className="purchasing-power-div">
                                    <span className="trading-form-span">Purchasing Power: ${balance}</span>
                                </div>
                                <div>
                                    <label className="trading-form-span"> Shares:
                                        <input className="shares"
                                            type='number'
                                            min='0'
                                            name='shares'
                                            onChange={updateShares}
                                            value={shares}></input>
                                    </label>
                                </div>
                                <div>
                                    <span className="trading-form-span">Market Price: ${stock.price}</span>
                                </div>
                                <div>
                                    <span className="trading-form-span">Total Cost: $</span>{totalCost && <span>{totalCost}</span>}
                                </div>
                            </div>
                            <div className="submit-div">
                                <button className='confirm-transaction' type="submit" onSubmit={onSubmit}>Confirm Transaction</button>
                            </div>
                        </div>
                    </form>
                    <div className="add-to-list">
                        <div>
                            {errors && listerrors && errors.map((error, ind) => (
                                <div key={ind}>
                                    <span className="error-span-stock">{error}</span>
                                    {/* <button onClick={() => {
                                        setListErrors(false)
                                        setErrors([])
                                    }}>Close</button> */}
                                </div>
                                ))}

                        </div>
                        <div className="list-button" >
                            <button className='add-list-stock' onClick={handleAddList}>Add to a List</button>
                        </div>
                        {listform &&
                            <div className="add-to-list-form">
                                <form className="add-to-list-form" onSubmit={handleAddStock}>
                                    <select name='lists' value={selectedList} onChange={(e) => {
                                        setSelectedList(e.target.value)
                                        setListid(e.target.value)
                                    }}>
                                        <option value={0}>Select A List</option>
                                        {listform && listarr &&
                                            listarr.map(list => (
                                                <option key={list.id} value={list.id}>{list.name}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="submit-stock-div">
                                        <button className='submit-list' type='submit'>Submit</button>
                                    </div>
                                    <div className="submit-stock-div">
                                        <button className='cancel-list' onClick={() =>
                                        {
                                            setlistform(false)
                                            setListErrors(false)
                                            setErrors([])
                                        }
                                        } type='submit'>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
                <h2 className='receipts-heading'>Your Portfolio</h2>
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
                            <span className='receipt-info-span'>Total Shares Owned: {receipt.shares}</span>
                            <span className='receipt-info-span'>Share Value: {receipt.share_value}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div> }

        </>
    )
}

export default StockInfo
