import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStock, addStockList} from "../../store/stocks";
import { makeTransaction} from "../../store/transactions";
import { getBalance } from "../../store/user";
import './StockInfo.css';
import PortfolioChart from "../PortfolioPage/PortfolioChart";
import { getUserLists } from "../../store/lists";

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
    const [buttonBg, setButtonbg] = useState(0);
    const [method, setMethod] = useState('');
    const [shares, setShares] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const receiptObj = useSelector(state => state.transactions)
    const receipts = Object.values(receiptObj);
    const [addList, setAddList] = useState(false)
    const [listid, setListid] = useState(0);
    const [removeList, setRemoveList] = useState(false);
    const [listform, setlistform] = useState(false);
    const [selectedList, setSelectedList] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        if (!stock) {
            dispatch(getStock(ticker))
            dispatch(getUserLists(userid))
        }
    })

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
            dispatch(addStockList(stock, listid))
            setAddList(false)
        }
        // else if (removeList) {
        //     dispatch(deleteStockList(stock, listid))
        // }
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(makeTransaction(userid, stock.id, shares, method, totalCost))
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

    const handleSelect = (e) => {
        setSelectedList(e.target.value)
        setListid(e.target.value)
    }

    const handleAddStock = (e) => {
        e.preventDefault()
        setAddList(true)
        setlistform(false)
    }
    return (
        <>
            {receipts && receipts.map(r => (
                <div key={r.id}>
                    <div>Your Shares of {stock.name}: {r.shares}</div>
                    <div>Current Market Value: {r.share_value}</div>
                </div>
            ))}

            {stock &&
            <div className="stock-page-container" >
                <div className="stock-info-container">
                    <div className="stock-name-tkr-container">
                        <h1 className="stock-name">{stock.name}</h1>
                        <h1 className="stock-name">${stock.price}</h1>
                    </div>
                    <div className="stock-graph-container">
                        <PortfolioChart />
                    </div>
                    <div className="stock-about-container">
                        <h2>About</h2>
                        <p>{stock.description}</p>
                    </div>
                </div>
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
                            <div className="purchasing-power-div">
                                <span>Purchasing Power: ${balance}</span>
                            </div>
                            <div>
                                <label> Shares:
                                    <input className="shares"
                                        type='number'
                                        min='0'
                                        name='shares'
                                        onChange={updateShares}
                                        value={shares}></input>
                                </label>
                            </div>
                            <div>
                                <span>Market Price: ${stock.price}</span>
                            </div>
                            <div>
                                <span>Total Cost: $</span>{totalCost && <span>{totalCost}</span>}
                            </div>
                            <div>
                                <button type="submit" onSubmit={onSubmit}>Confirm Transaction</button>
                            </div>
                        </div>
                    </form>
                    <div className="list-button" >
                        <button onClick={() => setlistform(true)}>Add to List</button>
                    </div>
                    {listform &&
                        <div>
                            <form onSubmit={handleAddStock}>
                                <select name='lists' value={selectedList} onChange={handleSelect}>
                                    {listform && listarr &&
                                        listarr.map(list => (
                                            <option key={list.id} value={list.id}>{list.name}</option>
                                        ))
                                    }
                                </select>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    }
                </div>

            </div> }

        </>
    )
}

export default StockInfo
