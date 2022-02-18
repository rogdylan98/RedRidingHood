import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStock } from "../../store/stocks";
import { makeTransaction} from "../../store/transactions";

const StockInfo = () => {
    const { ticker } = useParams();
    const stock = useSelector(state => state.stocks[ticker]);
    const userid = useSelector(state => state.session.user.id)
    const user_balance = useSelector(state => state.session.user.balance);
    const [balance, setBalance] = useState(user_balance)
    const [errors, setErrors] = useState([]);
    const [method, setMethod] = useState('');
    const [shares, setShares] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!stock) {
            dispatch(getStock(ticker))
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(method, "LOOK HERE")
        const data = await dispatch(makeTransaction(userid, stock.id, shares, method, totalCost))
        if (data && method) {
            if (method === 'buy'){
                setBalance(balance - totalCost)
            } else {
                setBalance(balance + totalCost)
            }
        }
    }

    const updateShares = (e) => {
        setShares(e.target.value)
        setTotalCost(e.target.value * stock.price)
    }

    const handleBuy = (e) => {
        e.preventDefault()
        setMethod('buy')
    }

    const handleSell = (e) => {
        e.preventDefault()
        setMethod('sell')
    }
    return (
        <>
            {stock &&
            <div className="stock-page-container">
                <div className="stock-info-container">
                    <div className="stock-name-tkr-container">
                        <span className="stock-name-tkr">{stock.name} ({stock.ticker})</span>
                    </div>
                    <div className="stock-price-container">
                        <span className="stock-price">${stock.price}</span>
                    </div>
                    <div className="stock-graph-container">
                        <span>Graph coming soon</span>
                    </div>
                    <div className="stock-about-container">
                        <h2>About</h2>
                        <p>{stock.description}</p>
                    </div>
                </div>
                <div className="stock-form-container">
                    <form onSubmit={onSubmit} className="stock-form">
                        <div>
                            <div>
                                <span>Your current Balance {balance}</span>
                            </div>
                        </div>
                        <div className="buy-sell-container">
                            <div className="buy-container">
                                <button onClick={handleBuy} className="buy-span">Buy</button>
                            </div>
                            <div className="sell-container">
                                <button onClick={handleSell} className="sell-span">Sell</button>
                            </div>
                            {console.log(method, shares)}
                        </div>
                        <div className="buy-sell-info-container">
                            <div>
                                <label> Shares
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
                                <span>Total Cost: </span>{totalCost && <span>{totalCost}</span>}
                            </div>
                            <div>
                                <button type="submit" onSubmit={onSubmit}>Confirm Transaction</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div> }
        </>
    )
}

export default StockInfo
